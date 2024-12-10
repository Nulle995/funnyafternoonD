from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Case, When, Value, IntegerField, F
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils import timezone
from xhtml2pdf import pisa
from .models import Transaccion
from .serializers import TransaccionSerializer

from .models import Transaccion
from .serializers import TransaccionSerializer
from datetime import datetime
from reportlab.pdfgen import canvas
from io import BytesIO

# Create your views here.


class TransaccionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Transaccion.objects.all().order_by("-fecha")
    serializer_class = TransaccionSerializer


class TransaccionUpdateAPIView(generics.UpdateAPIView):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer


class TransaccionDeleteAPIView(generics.DestroyAPIView):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer


class InformeMensualView(APIView):
    def get(self, request, *args, **kwargs):
        year = request.query_params.get("year")
        month = request.query_params.get("month")
        format_type = request.query_params.get("output")
        if not year or not month:
            return Response({"error": "Must be a year and a month!"})

        try:
            year = int(year)
            month = int(month)
            transacciones = Transaccion.objects.filter(
                fecha__year=year, fecha__month=month
            )

            transacciones_ajustadas = transacciones.annotate(
                monto_ajustado=Case(
                    When(
                        tipo_transaccion="Egreso", then=-F("monto")
                    ),  # Si es Egreso, restamos el monto
                    default=F("monto"),  # Si es Ingreso, no se hace cambio
                    output_field=IntegerField(),
                )
            )
            total = (
                transacciones_ajustadas.aggregate(Sum("monto_ajustado"))[
                    "monto_ajustado__sum"
                ]
                or 0
            )

            if format_type == "pdf":
                buffer = BytesIO()

                html_content = render_to_string(
                    "transacciones/informe_mensual.html",
                    {
                        "year": year,
                        "month": month,
                        "total": total,
                        "transacciones": transacciones,
                    },
                )

                pisa_status = pisa.CreatePDF(html_content, dest=buffer)
                if pisa_status.err:
                    return HttpResponse("Error al generar pdf", status=500)

                buffer.seek(0)
                response = HttpResponse(buffer, content_type="application/pdf")

                response["Content-Disposition"] = (
                    f'attachment; filename="informe_{year}_{month}.pdf"'
                )
                return response

            serializer = TransaccionSerializer(transacciones, many=True)
            return Response({"transacciones": serializer.data, "total_mensual": total})

        except ValueError:
            return Response(
                {"error": "Year and month must be numbers!"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class InformeUltimoTresMesesView(APIView):
    def get(self, request, *args, **kwargs):
        format_type = request.query_params.get("output")

        today = timezone.now()
        current_year = today.year
        current_month = today.month
        try:
            months = [(current_month - i) % 12 or 12 for i in range(3)]
            years = [
                current_year if current_month - i > 0 else current_year - 1
                for i in range(3)
            ]
            transacciones = Transaccion.objects.filter(
                fecha__year__in=years, fecha__month__in=months
            )

            transacciones_ajustadas = transacciones.annotate(
                monto_ajustado=Case(
                    When(
                        tipo_transaccion="Egreso", then=-F("monto")
                    ),  # Si es Egreso, restamos el monto
                    default=F("monto"),  # Si es Ingreso, no se hace cambio
                    output_field=IntegerField(),
                )
            )
            total = (
                transacciones_ajustadas.aggregate(Sum("monto_ajustado"))[
                    "monto_ajustado__sum"
                ]
                or 0
            )

            if format_type == "pdf":
                buffer = BytesIO()

                html_content = render_to_string(
                    "transacciones/informe_3.html",
                    {
                        "years": years,
                        "months": months,
                        "total": total,
                        "transacciones": transacciones,
                    },
                )

                pisa_status = pisa.CreatePDF(html_content, dest=buffer)
                if pisa_status.err:
                    return HttpResponse("Error al generar pdf", status=500)

                buffer.seek(0)
                response = HttpResponse(buffer, content_type="application/pdf")

                response["Content-Disposition"] = (
                    f'attachment; filename="informe_{"year"}_{"month"}.pdf"'
                )
                return response

            serializer = TransaccionSerializer(transacciones, many=True)
            return Response({"transacciones": serializer.data, "total_mensual": total})

        except ValueError:
            return Response(
                {"error": "Year and month must be numbers!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

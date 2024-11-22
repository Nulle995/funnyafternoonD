from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from django.http import HttpResponse

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
            print("paso las fechas")
            transacciones = Transaccion.objects.filter(
                fecha__year=year, fecha__month=month
            )
            total = transacciones.aggregate(Sum("monto"))["monto__sum"] or 0
            print("paso las sumas")

            if format_type == "pdf":
                buffer = BytesIO()
                p = canvas.Canvas(buffer)
                print("paso la creación de pdf")

                p.setFont("Helvetica-Bold", 16)
                p.drawString(100, 800, f"Informe Mensual - {month}/{year}")
                p.setFont("Helvetica", 12)

                p.drawString(100, 780, f"Total: {total} CLP")
                p.drawString(100, 760, f"Transacciones:")

                y = 740
                print("paso la creación de lineas")

                for transaccion in transacciones:
                    p.drawString(
                        100,
                        y,
                        f"- {transaccion.fecha} | {transaccion.tipo_transaccion} | {transaccion.categoria} | {transaccion.monto}",
                    )
                    y -= 20
                    if y < 50:
                        p.showPage()
                        p.setFont("Helvetica", 12)
                        y = 780
                p.save()
                buffer.seek(0)
                response = HttpResponse(buffer, content_type="application/pdf")
                response["Content-Disposition"] = (
                    f'attachment; filename="informe_{year}_{month}"'
                )
                return response

            serializer = TransaccionSerializer(transacciones, many=True)
            return Response({"transacciones": serializer.data, "total_mensual": total})

        except ValueError:
            return Response(
                {"error": "Year and month must be numbers!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

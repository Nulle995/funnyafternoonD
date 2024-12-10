from rest_framework import generics
from .models import Evento
from .serializers import EventoSerializer
from transacciones.models import Transaccion


# Create your views here.
class EventoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

    def perform_create(self, serializer):
        evento = serializer.save()
        transaccion = Transaccion.objects.create(
            fecha=evento.fecha_inicio,
            desc=evento.desc,
            tipo_transaccion="Ingreso",
            categoria="Arriendo Local",
            monto=evento.monto,
            evento=evento,
        )


class EventoUpdateAPIView(generics.UpdateAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer


class EventoDeleteAPIView(generics.DestroyAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

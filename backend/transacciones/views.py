from rest_framework import generics
from .models import Transaccion
from .serializers import TransaccionSerializer

# Create your views here.


class TransaccionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer

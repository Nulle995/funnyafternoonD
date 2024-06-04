from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Estudiante
from .serializers import EstudianteSerializer, EstudianteDetailSerializer


# Create your views here.
class EstudianteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    permission_classes = [
        IsAuthenticated,
    ]


class EstudianteDetailAPIView(generics.RetrieveAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteDetailSerializer


class EstudianteUpdateAPIView(generics.UpdateAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer


class EstudianteDeleteAPIView(generics.DestroyAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer

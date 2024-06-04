from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Apoderado
from .serializers import ApoderadoSerializer


# Create your views here.
class ApoderadoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Apoderado.objects.all()
    serializer_class = ApoderadoSerializer
    permission_classes = [
        IsAuthenticated,
    ]


class ApoderadoDetailAPIView(generics.RetrieveAPIView):
    queryset = Apoderado.objects.all()
    serializer_class = ApoderadoSerializer


class ApoderadoUpdateAPIView(generics.UpdateAPIView):
    queryset = Apoderado.objects.all()
    serializer_class = ApoderadoSerializer


class ApoderadoDeleteAPIView(generics.DestroyAPIView):
    queryset = Apoderado.objects.all()
    serializer_class = ApoderadoSerializer

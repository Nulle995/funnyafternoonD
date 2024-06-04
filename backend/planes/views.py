from rest_framework import generics
from .models import Plan
from .serializers import PlanSerializer

# Create your views here.


class PlanListCreateAPIView(generics.ListCreateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlanDetailAPIView(generics.RetrieveAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlanUpdateAPIView(generics.UpdateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlanDeleteAPIView(generics.DestroyAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

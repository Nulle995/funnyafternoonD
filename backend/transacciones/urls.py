from django.urls import path
from .views import TransaccionListCreateAPIView

urlpatterns = [
    path("", TransaccionListCreateAPIView.as_view(), name="transacciones"),
]

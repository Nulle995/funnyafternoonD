from django.urls import path
from .views import EventoListCreateAPIView

urlpatterns = [
    path("", EventoListCreateAPIView.as_view(), name="eventos"),
]

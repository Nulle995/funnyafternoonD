from django.urls import path
from .views import EventoListCreateAPIView, EventoUpdateAPIView, EventoDeleteAPIView

urlpatterns = [
    path("", EventoListCreateAPIView.as_view(), name="eventos"),
    path("<int:pk>/update/", EventoUpdateAPIView.as_view(), name="eventos-update"),
    path("<int:pk>/delete/", EventoDeleteAPIView.as_view(), name="eventos-delete"),
]

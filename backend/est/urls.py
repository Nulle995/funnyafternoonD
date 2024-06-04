from django.urls import path
from .views import (
    EstudianteListCreateAPIView,
    EstudianteDetailAPIView,
    EstudianteUpdateAPIView,
    EstudianteDeleteAPIView,
)

urlpatterns = [
    path("", EstudianteListCreateAPIView.as_view(), name="estudiantes"),
    path("<int:pk>/", EstudianteDetailAPIView.as_view(), name="estudiantes-detail"),
    path(
        "<int:pk>/update/", EstudianteUpdateAPIView.as_view(), name="estudiante-update"
    ),
    path(
        "<int:pk>/delete/", EstudianteDeleteAPIView.as_view(), name="estudiante-delete"
    ),
]

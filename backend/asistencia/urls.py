from django.urls import path
from .views import (
    AsistenciaListCreateAPIView,
    AsistenciaDetailAPIView,
    AsistenciaUpdateAPIView,
    AsistenciaDeleteAPIView,
)


urlpatterns = [
    path("", AsistenciaListCreateAPIView.as_view(), name="asistencias"),
    path("<int:pk>/", AsistenciaDetailAPIView.as_view(), name="asistencias-detail"),
    path(
        "<int:pk>/update/", AsistenciaUpdateAPIView.as_view(), name="asistencias-update"
    ),
    path(
        "<int:pk>/delete/", AsistenciaDeleteAPIView.as_view(), name="asistencia-delete"
    ),
]

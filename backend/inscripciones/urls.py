from django.urls import path
from .views import (
    InscripcionListCreateAPIView,
    InscripcionDetailAPIView,
    InscripcionUpdateAPIView,
    InscripcionDeleteAPIView,
)

urlpatterns = [
    path("", InscripcionListCreateAPIView.as_view(), name="inscripciones"),
    path("<int:pk>/", InscripcionDetailAPIView.as_view(), name="inscripciones-detail"),
    path(
        "<int:pk>/update/",
        InscripcionUpdateAPIView.as_view(),
        name="inscripciones-update",
    ),
    path(
        "<int:pk>/delete/",
        InscripcionDeleteAPIView.as_view(),
        name="inscripciones-delete",
    ),
]

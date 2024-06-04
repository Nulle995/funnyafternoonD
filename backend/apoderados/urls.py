from django.urls import path
from .views import (
    ApoderadoListCreateAPIView,
    ApoderadoDetailAPIView,
    ApoderadoUpdateAPIView,
    ApoderadoDeleteAPIView,
)

urlpatterns = [
    path("", ApoderadoListCreateAPIView.as_view(), name="apoderados"),
    path("<int:pk>/", ApoderadoDetailAPIView.as_view(), name="apoderados-detail"),
    path(
        "<int:pk>/update/", ApoderadoUpdateAPIView.as_view(), name="apoderados-update"
    ),
    path(
        "<int:pk>/delete/", ApoderadoDeleteAPIView.as_view(), name="apoderados-delete"
    ),
]

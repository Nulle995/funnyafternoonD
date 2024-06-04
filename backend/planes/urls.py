from django.urls import path
from .views import (
    PlanListCreateAPIView,
    PlanDetailAPIView,
    PlanUpdateAPIView,
    PlanDeleteAPIView,
)

urlpatterns = [
    path("", PlanListCreateAPIView.as_view(), name="planes"),
    path("<int:pk>/", PlanDeleteAPIView.as_view(), name="planes-detail"),
    path("<int:pk>/update/", PlanUpdateAPIView.as_view(), name="planes-update"),
    path("<int:pk>/detele/", PlanDeleteAPIView.as_view(), name="planes-delete"),
]

from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'owner', 'is_completed', 'created_at')
    list_filter = ('is_completed', 'created_at')
    search_fields = ('title', 'description', 'owner__username')

"""Factory stub for running the Craft scheduled-tasks Celery worker."""

from celery import Celery


def get_app() -> Celery:
    from onyx.background.celery.apps.scheduled_tasks import celery_app

    return celery_app


app = get_app()

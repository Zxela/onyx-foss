"""Factory stub for running celery worker / celery beat.
This code is different from the primary/beat stubs because there is no EE version to
fetch. Port over the code in those files if we add an EE version of this worker."""

from celery import Celery

from onyx.background.celery.apps.heavy import celery_app

app: Celery = celery_app

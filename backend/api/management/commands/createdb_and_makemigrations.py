from django.core.management.commands.makemigrations import Command as MakeMigrationsCommand
from django.conf import settings
import psycopg2
from psycopg2 import sql

class Command(MakeMigrationsCommand):
    def handle(self, *args, **kwargs):
        self.create_database_if_not_exists()
        super().handle(*args, **kwargs)

    def create_database_if_not_exists(self):
        db_name = settings.DATABASES['default']['NAME']
        db_user = settings.DATABASES['default']['USER']
        db_password = settings.DATABASES['default']['PASSWORD']
        db_host = settings.DATABASES['default']['HOST']
        db_port = settings.DATABASES['default']['PORT']

        try:
            # Connect to the default database
            conn = psycopg2.connect(
                # dbname = "postgres",
                user = db_user,
                password = db_password,
                host = db_host,
                port = db_port
            )
            conn.autocommit = True
            cursor = conn.cursor()

            # Check if the database exists
            cursor.execute(sql.SQL("SELECT 1 FROM pg_database WHERE datname = %s"), [db_name])
            exists = cursor.fetchone()

            if not exists:
                # Create the database
                cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(db_name)))
                self.stdout.write(self.style.SUCCESS(f'Database {db_name} created successfully'))
            else:
                self.stdout.write(self.style.SUCCESS('Database already exists'))

            cursor.close()
            conn.close()
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error creating database: {e}'))
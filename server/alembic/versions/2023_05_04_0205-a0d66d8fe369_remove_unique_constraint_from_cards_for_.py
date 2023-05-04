"""remove unique constraint from cards for field position

Revision ID: a0d66d8fe369
Revises: 5f5a31350e09
Create Date: 2023-05-04 02:05:41.550053

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0d66d8fe369'
down_revision = '5f5a31350e09'
branch_labels = None
depends_on = None


def upgrade() -> None:
    with op.batch_alter_table('cards') as batch_op:
        batch_op.drop_constraint('cards_position_key', type_='unique')


def downgrade() -> None:
    with op.batch_alter_table('cards') as batch_op:
        batch_op.create_unique_constraint('cards_position_key', ['position'])

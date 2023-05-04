from sqlalchemy.orm import Session

from . import models, schemas


def get_card(db: Session, card_id: int):
    return db.query(models.Card).filter(models.Card.id == card_id).first()


def get_cards(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Card).order_by(models.Card.position).offset(skip).limit(limit).all()


def create_card(db: Session, card: schemas.CardCreate):
    db_card = models.Card(**card.dict())
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card


def update_card(db: Session, card_id: int, card: schemas.CardUpdate):
    db_card = db.query(models.Card).filter(models.Card.id == card_id).first()
    if db_card:
        for attr, value in card.dict().items():
            setattr(db_card, attr, value)
        db.commit()
        db.refresh(db_card)
    return db_card


def delete_card(db: Session, card_id: int):
    db_card = db.query(models.Card).filter(models.Card.id == card_id).first()
    if db_card:
        db.delete(db_card)
        db.commit()
    return db_card

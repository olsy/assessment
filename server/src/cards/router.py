import shutil
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from src.database import get_db
from . import services, schemas, models

router = APIRouter(
    prefix="/api/cards",
    tags=["cards"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_cards(db: Session = Depends(get_db)):
    cards = services.get_cards(db)
    return cards


@router.get("/{id}", tags=["custom"])
async def read_card(id: int, db: Session = Depends(get_db)):
    card = services.get_card(db, id)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


def validate_card(card: schemas.CardCreate):
    return card


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = f"src/static/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"path": '/images/' + file.filename}


@router.post("/")
async def create_card(card: schemas.CardCreate, db: Session = Depends(get_db)):
    validated_card = validate_card(card)
    created_card = services.create_card(db, validated_card)
    return created_card


@router.put("/")
async def update_cards(cards: list, db: Session = Depends(get_db)):
    try:
        with db.begin():
            for card in cards:
                print(card)
                db_card = db.query(models.Card).filter(models.Card.type == card["type"]).first()
                if db_card:
                    for attr, value in card.items():
                        setattr(db_card, attr, value)
                    db.flush()
            db.commit()
            return JSONResponse({"lastTimeSaved": datetime.now().strftime("%Y-%m-%d %H:%M:%S")})
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail="Integrity error: " + str(e))


@router.put("/{id}")
async def update_card(id: int, card: schemas.CardUpdate, db: Session = Depends(get_db)):
    updated_card = services.update_card(db, id, card)
    if updated_card is None:
        raise HTTPException(status_code=404, detail="Card not found")
    return updated_card


@router.delete("/{id}")
async def delete_card(id: int, db: Session = Depends(get_db)):
    result = services.delete_card(db, id)
    if result is None:
        raise HTTPException(status_code=404, detail="Card not found")
    return {"message": "Card deleted successfully"}

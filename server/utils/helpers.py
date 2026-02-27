"""
Utility functions and helpers
"""
from bson import ObjectId
from typing import Any, Dict

def serialize_doc(doc: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convert MongoDB document to JSON-serializable dict
    
    Args:
        doc: MongoDB document
        
    Returns:
        Serialized document with _id converted to string
    """
    if doc is None:
        return None
    
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    
    if not isinstance(doc, dict):
        return doc
    
    serialized = {}
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            serialized[key] = str(value)
        elif isinstance(value, dict):
            serialized[key] = serialize_doc(value)
        elif isinstance(value, list):
            serialized[key] = [serialize_doc(item) if isinstance(item, dict) else item for item in value]
        else:
            serialized[key] = value
    
    return serialized

def validate_object_id(id_str: str) -> bool:
    """
    Validate if string is a valid MongoDB ObjectId
    
    Args:
        id_str: String to validate
        
    Returns:
        True if valid ObjectId, False otherwise
    """
    return ObjectId.is_valid(id_str)

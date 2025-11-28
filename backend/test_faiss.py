import sys
import os

# Add the current directory to sys.path so we can import load_vector_store
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from load_vector_store import search, ask_rag
    print("Successfully imported functions from load_vector_store")
    
    test_queries = [
        "I've been feeling anxious lately",
        "I feel depressed and lonely",
        "How can I deal with stress?"
    ]
    
    for query in test_queries:
        print(f"\n{'='*60}")
        print(f"Query: '{query}'")
        print(f"{'='*60}")
        
        results = search(query)
        print(f"\nResponse:\n{results[0]}")
        
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()

import sys
import os

# Add the current directory to sys.path so we can import load_vector_store
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from load_vector_store import search
    print("Successfully imported search function from load_vector_store")
    
    query = "I feel anxious"
    print(f"Testing query: '{query}'")
    
    results = search(query)
    print(f"Found {len(results)} results")
    
    for i, res in enumerate(results):
        print(f"Result {i+1}: {res}")
        
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()

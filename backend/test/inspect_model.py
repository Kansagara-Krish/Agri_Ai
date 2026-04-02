import joblib

def inspect():
    columns = joblib.load('/disk2/conv/backend/app/models/fertilizer_recommendation/columns.pkl')
    print("Columns:", columns)
    
    le = joblib.load('/disk2/conv/backend/app/models/fertilizer_recommendation/label_encoder.pkl')
    print("Label Encoder Classes:", le.classes_)
    
    model = joblib.load('/disk2/conv/backend/app/models/fertilizer_recommendation/fertilizer_model.pkl')
    print("Model Type:", type(model))

if __name__ == '__main__':
    inspect()

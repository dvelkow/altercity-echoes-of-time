from flask import Flask, jsonify, request
from flask_cors import CORS
from city_stats import CityStats, initialize_city, save_city_state, load_city_state
from decisions import DecisionManager

app = Flask(__name__)
CORS(app)

TIME_TRAVEL_YEARS = [1933, 1966, 1999, 2032]
city = initialize_city()
decision_manager = DecisionManager()
timeline = {year: initialize_city() for year in TIME_TRAVEL_YEARS}

@app.route('/api/city_stats', methods=['GET'])
def get_city_stats():
    return jsonify(city.to_dict())

@app.route('/api/available_decisions', methods=['GET'])
def get_available_decisions():
    decisions = decision_manager.get_available_decisions(city)
    return jsonify([d.__dict__ for d in decisions])

@app.route('/api/apply_decision', methods=['POST'])
def apply_decision():
    decision_name = request.json['decision_name']
    decision = next((d for d in decision_manager.decisions if d.name == decision_name), None)
    if decision:
        global city
        city = decision_manager.apply_decision(decision, city)
        timeline[city.year] = city
        return jsonify({"success": True, "message": "Decision applied successfully"})
    return jsonify({"success": False, "message": "Decision not found"}), 400

@app.route('/api/time_travel', methods=['POST'])
def time_travel():
    year = request.json['year']
    if year in TIME_TRAVEL_YEARS:
        global city
        city = timeline[year]
        return jsonify({"success": True, "message": f"Traveled to year {year}"})
    return jsonify({"success": False, "message": "Invalid year for time travel"}), 400

if __name__ == '__main__':
    app.run(debug=True)
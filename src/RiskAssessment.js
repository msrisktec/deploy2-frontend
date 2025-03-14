import React, { useState } from "react";

const RiskAssessment = () => {
    const [formData, setFormData] = useState({
        financial_stability: "",
        market_volatility: "",
        cybersecurity_risk: "",
        operational_risk: "",
    });
    
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("https://deploy1-7u9a.onrender.com/assess-risk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    financial_stability: parseFloat(formData.financial_stability),
                    market_volatility: parseFloat(formData.market_volatility),
                    cybersecurity_risk: parseFloat(formData.cybersecurity_risk),
                    operational_risk: parseFloat(formData.operational_risk),
                }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error assessing risk:", error);
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">AI-Powered Risk Assessment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label className="block text-gray-700 capitalize">{key.replace("_", " ")}</label>
                        <input
                            type="number"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    {loading ? "Assessing..." : "Assess Risk"}
                </button>
            </form>
            {result && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h3 className="text-lg font-bold">Risk Level: {result.risk_level}</h3>
                    <p className="mt-2">{result.recommendation}</p>
                </div>
            )}
        </div>
    );
};

export default RiskAssessment;

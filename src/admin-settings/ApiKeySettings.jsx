const ApiKeySettings = ({ label, enabled, apiKey, onToggle, onApiKeyChange }) => {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => onToggle(e.target.checked)}
                />
                {label}
            </label>
            {enabled && (
                <div>
                    <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => onApiKeyChange(e.target.value)}
                        placeholder="Enter API Key"
                    />
                </div>
            )}
        </div>
    );
};

export default ApiKeySettings;

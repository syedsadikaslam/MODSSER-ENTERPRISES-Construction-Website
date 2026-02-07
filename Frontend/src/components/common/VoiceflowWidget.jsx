import React, { useEffect } from 'react';

const VoiceflowWidget = () => {
    useEffect(() => {
        // Only load script if not already loaded
        if (document.getElementById('voiceflow-widget-script')) return;

        const script = document.createElement('script');
        script.id = 'voiceflow-widget-script'; // Prevent duplicate loading
        script.type = 'text/javascript';
        script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';

        script.onload = () => {
            if (window.voiceflow && window.voiceflow.chat) {
                window.voiceflow.chat.load({
                    verify: { projectID: '68c57b283596867e16d74fe2' },
                    url: 'https://general-runtime.voiceflow.com',
                    versionID: 'production',
                    voice: {
                        url: "https://runtime-api.voiceflow.com"
                    }
                });
            }
        };

        document.body.appendChild(script);

        // Cleanup not strictly necessary for a global widget, but good practice if it were page-specific
        return () => {
            // We usually don't remove the script as it might cache, but we could if needed.
        };
    }, []);

    return null; // This component doesn't render anything visible itself
};

export default VoiceflowWidget;

import React from "react";
import { Plus, Minus, ChevronDown } from "lucide-react";

interface GeminiAuditIssue {
  id: number;
  title: string;
  description: string;
}

export interface GeminiAuditResponse {
  title: string;
  subtitle: string; // The service already formats this with the count
  issues: GeminiAuditIssue[];
}

interface SettingsPanelProps {
  showAuditSummary: boolean;
  callouts: number;
  onIncrementCallouts: () => void;
  onDecrementCallouts: () => void;
  isLoading?: boolean; // Make optional if not always passed or default internally
  apiResponse?: GeminiAuditResponse | { error: string } | null; // To handle success, error, or no data
}

// Keep mock data for when API response isn't shown or as fallback if needed,
// though the main display will prioritize apiResponse.
const mockAuditData = {
  title: "Audit summary",
  subtitle: (count: number) => `Here are ${count} issues observed in the calendar screenshot:`,
  issues: [
    {
      id: 1,
      title: "Overlapping Text in Events",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta nisi ac lorem posuere, ut egestas odio scelerisque.",
    },
    {
      id: 2,
      title: "Ambiguous Event Titles (Truncated Text)",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta nisi ac lorem posuere, ut egestas odio scelerisque.",
    },
    {
      id: 3,
      title: "Inconsistent Text Contrast",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta nisi ac lorem posuere, ut egestas odio scelerisque.",
    },
    {
      id: 4,
      title: "Cluttered Time Slot at 3 PM on Tuesday",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta nisi ac lorem posuere, ut egestas odio scelerisque.",
    },
    {
      id: 5,
      title: "Lack of Visual Hierarchy for Recurring Events",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta nisi ac lorem posuere, ut egestas odio scelerisque.",
    },
    {
      id: 6,
      title: "Issue 6",
      description: "Description for issue 6.",
    },
    {
      id: 7,
      title: "Issue 7",
      description: "Description for issue 7.",
    },
    {
      id: 8,
      title: "Issue 8",
      description: "Description for issue 8.",
    },
    {
      id: 9,
      title: "Issue 9",
      description: "Description for issue 9.",
    },
    {
      id: 10,
      title: "Issue 10",
      description: "Description for issue 10.",
    },
  ],
};


export const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  showAuditSummary, 
  callouts, 
  onIncrementCallouts, 
  onDecrementCallouts,
  isLoading,
  apiResponse
}) => {

  // Determine max callouts based on mock data if API hasn't specified or loaded yet
  // This might need adjustment if API can return variable number of issues regardless of initial 'callouts' param
  const maxCallouts = mockAuditData.issues.length; 

  const renderAuditContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-300">Awwwditing your image...</p>;
    }

    // Explicitly check for the error structure first
    if (apiResponse && typeof apiResponse === 'object' && 'error' in apiResponse && apiResponse.error) {
      return <p className="text-center text-red-400">Error: {apiResponse.error}</p>;
    }

    // Then check for the success structure (GeminiAuditResponse)
    // We can safely cast here or ensure the structure matches GeminiAuditResponse
    const successfulResponse = apiResponse as GeminiAuditResponse;
    if (successfulResponse && successfulResponse.issues) {
      return (
        <>
          <h2 className="text-2xl font-semibold mb-2">{successfulResponse.title}</h2>
          <p className="text-sm text-gray-300 mb-6">{successfulResponse.subtitle}</p>
          <div className="h-40 overflow-y-scroll space-y-5 pr-2 custom-scrollbar">
            {successfulResponse.issues.map(issue => (
              <div key={issue.id} className="min-h-[5rem]">
                <h3 className="font-semibold text-base mb-1">
                  {issue.id}. {issue.title} 
                </h3>
                <p className="text-sm text-gray-400 ml-4">
                  {issue.description}
                </p>
              </div>
            ))}
          </div>
        </>
      );
    }
    // Fallback or initial state content if needed, though typically hidden when showAuditSummary is false
    return <p className="text-center text-gray-500">No audit summary available.</p>;
  };

  return (
    <div className={`w-full transform transition-all duration-500 ease-in-out overflow-hidden ${showAuditSummary ? '' : 'h-[60px] bg-black rounded-b-[20px]'}`}>
      {!showAuditSummary && (
        <div className="flex items-center justify-between w-full h-full px-6">
          <div className="flex items-center gap-4">
            <span className="text-[#8B8B8B] text-sm">Number of Callouts</span>
            <div className="flex items-center gap-4">
              <button 
                className={`text-[#8B8B8B] hover:text-white transition-colors ${
                  callouts <= 1 ? 'opacity-50 cursor-not-allowed' : '' 
                }`}
                onClick={onDecrementCallouts}
                disabled={callouts <= 1} 
              >
                <Minus size={20} />
              </button>
              <span className="text-white text-lg font-medium">{callouts.toString().padStart(2, '0')}</span>
              <button 
                className={`text-[#8B8B8B] hover:text-white transition-colors ${
                  // Use maxCallouts which can be updated if API provides a different limit
                  callouts >= maxCallouts ? 'opacity-50 cursor-not-allowed' : '' 
                }`}
                onClick={onIncrementCallouts}
                disabled={callouts >= maxCallouts} 
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 relative">
            <span className="text-[#8B8B8B] text-sm">Style of Callouts</span>
            <select className="appearance-none bg-[#2C2C2C] text-white text-sm px-4 py-1.5 pr-8 rounded-lg border-none outline-none cursor-pointer hover:bg-[#3C3C3C] transition-colors min-w-[160px]">
              <option value="design">Design Critique</option>
              <option value="recommendations">Recommendations</option>
              <option value="ideas">Ideas</option>
              <option value="ux">UX Principals</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" size={16} />
          </div>
        </div>
      )}

      {showAuditSummary && (
        <div className="bg-black rounded-b-[20px] pt-6 pb-6 px-6 text-white">
          {renderAuditContent()}
        </div>
      )}
    </div>
  );
};

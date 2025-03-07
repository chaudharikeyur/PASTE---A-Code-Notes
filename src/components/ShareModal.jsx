import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { ClipboardCopy } from 'lucide-react'

const ShareModal = ({ isOpen, onClose, link }) => {
  const [email, setEmail] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Link Copied!");
  };

  const handleShare = () => {
    alert(`Invitation sent to ${email}`);
    setEmail("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-lg text-slate-900 font-bold mb-4">Share this Link</h2>
        
        <div className="flex items-center mb-4 border rounded-lg p-2">
          <input type="text" value={link} readOnly className="w-full text-slate-900 bg-transparent outline-none" />
          <ClipboardCopy className="cursor-pointer" onClick={handleCopy} />
        </div>

        <input
          type="email"
          placeholder="Enter Email to Share"
          className="border text-slate-900 p-2 w-full mb-4 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 text-slate-900 py-2 bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={handleShare} className="px-4 py-2 text-slate-900 bg-blue-600  rounded-lg">
            Share
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ShareModal;


import React, { useState } from 'react';
import { FileText, Upload, Calendar, AlertTriangle, Download } from 'lucide-react';
import { TravelDocument } from '../../types';

interface DocumentOrganizerProps {
  documents: TravelDocument[];
  onAddDocument: (document: Omit<TravelDocument, 'id'>) => void;
}

export default function DocumentOrganizer({ documents, onAddDocument }: DocumentOrganizerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDocument, setNewDocument] = useState({
    type: 'passport',
    name: '',
    expiryDate: ''
  });

  const documentTypes = [
    'passport', 'visa', 'flight-ticket', 'hotel-booking', 'insurance', 'vaccination', 'other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDocument(newDocument);
    setNewDocument({ type: 'passport', name: '', expiryDate: '' });
    setShowAddForm(false);
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    return expiry <= thirtyDaysFromNow;
  };

  const getDocumentIcon = (type: string) => {
    return <FileText className="h-5 w-5" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Travel Documents</h3>
          <p className="text-gray-600">Keep all your important travel documents organized</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Add Document</span>
        </button>
      </div>

      {/* Add Document Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-semibold mb-4">Add New Document</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                <select
                  value={newDocument.type}
                  onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {documentTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                <input
                  type="text"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., US Passport, Travel Insurance Policy"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (if applicable)</label>
              <input
                type="date"
                value={newDocument.expiryDate}
                onChange={(e) => setNewDocument({ ...newDocument, expiryDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Document
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.length > 0 ? documents.map((document) => {
          const expiringSoon = document.expiryDate && isExpiringSoon(document.expiryDate);
          
          return (
            <div
              key={document.id}
              className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                expiringSoon ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${expiringSoon ? 'bg-orange-100' : 'bg-blue-100'}`}>
                    {getDocumentIcon(document.type)}
                  </div>
                  <div>
                    <div className="font-medium text-sm capitalize">
                      {document.type.replace('-', ' ')}
                    </div>
                  </div>
                </div>
                {expiringSoon && (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                )}
              </div>

              <h4 className="font-semibold mb-2">{document.name}</h4>

              {document.expiryDate && (
                <div className={`flex items-center space-x-1 text-sm mb-3 ${
                  expiringSoon ? 'text-orange-600' : 'text-gray-600'
                }`}>
                  <Calendar className="h-4 w-4" />
                  <span>Expires: {document.expiryDate}</span>
                </div>
              )}

              {expiringSoon && (
                <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mb-3">
                  Expiring Soon!
                </div>
              )}

              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center justify-center">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          );
        }) : (
          <div className="col-span-full text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No documents added yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Document
            </button>
          </div>
        )}
      </div>

      {/* Document Reminders */}
      {documents.some(doc => doc.expiryDate && isExpiringSoon(doc.expiryDate)) && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h4 className="font-semibold text-orange-900">Document Reminders</h4>
          </div>
          <p className="text-orange-800 text-sm">
            You have documents expiring within 30 days. Make sure to renew them before your trip!
          </p>
        </div>
      )}
    </div>
  );
}
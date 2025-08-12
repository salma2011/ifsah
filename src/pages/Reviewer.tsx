import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileCheck, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppSelector } from '../store/store';
import { ViolationData } from '../store/slices/violationSlice';

interface ReviewData {
  reviewNotes: string;
  recommendation: string;
  newStatus: string;
}

const Reviewer: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useAppSelector((state) => state.theme);
  const [assignedViolations, setAssignedViolations] = useState<ViolationData[]>([]);
  const [selectedViolation, setSelectedViolation] = useState<ViolationData | null>(null);
  const [reviewData, setReviewData] = useState<ReviewData>({
    reviewNotes: '',
    recommendation: '',
    newStatus: 'under_review',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for assigned violations
  useEffect(() => {
    const mockAssignedViolations: ViolationData[] = [
      {
        id: 'VR-1704567890-abc123def',
        type: 'Financial Misconduct',
        description: 'Suspected unauthorized financial transactions in Q4 2024',
        date: '2024-12-15',
        location: 'Finance Department, Building A',
        suspectedPeople: ['John Doe', 'Jane Smith'],
        relevantPeople: ['Mike Johnson'],
        attachments: [],
        status: 'under_review',
        submissionDate: '2024-12-20',
        referenceNumber: 'VR-1704567890-abc123def',
      },
      {
        id: 'VR-1704567894-mno234pqr',
        type: 'Policy Breach',
        description: 'Company policy violations regarding data handling procedures',
        date: '2024-12-16',
        location: 'IT Department',
        suspectedPeople: ['Alice Brown'],
        relevantPeople: ['Security Team Lead'],
        attachments: [],
        status: 'under_review',
        submissionDate: '2024-12-17',
        referenceNumber: 'VR-1704567894-mno234pqr',
      },
    ];

    setTimeout(() => {
      setAssignedViolations(mockAssignedViolations);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleViolationSelect = (violation: ViolationData) => {
    setSelectedViolation(violation);
    setReviewData({
      reviewNotes: '',
      recommendation: '',
      newStatus: violation.status || 'under_review',
    });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Review submitted:', {
        violationId: selectedViolation?.id,
        reviewData,
      });
      
      // Update violation status locally
      setAssignedViolations(prev =>
        prev.map(v =>
          v.id === selectedViolation?.id
            ? { ...v, status: reviewData.newStatus as any }
            : v
        )
      );

      alert('Review submitted successfully!');
      setSelectedViolation(null);
      setIsSubmitting(false);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under_review':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  if (selectedViolation) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setSelectedViolation(null)}
            className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            ← {t('common.back')}
          </button>
        </div>

        <div className={`rounded-2xl p-8 shadow-xl ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Review Violation Case
            </h1>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Reference: {selectedViolation.referenceNumber}
            </p>
          </div>

          {/* Violation Details */}
          <div className={`mb-8 p-6 rounded-xl ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Violation Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Type: <span className={`font-normal ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>{selectedViolation.type}</span>
                </p>
                <p className={`text-sm font-medium mt-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Date: <span className={`font-normal ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>{selectedViolation.date}</span>
                </p>
                <p className={`text-sm font-medium mt-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Location: <span className={`font-normal ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>{selectedViolation.location}</span>
                </p>
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Suspected People:
                </p>
                <ul className={`mt-1 text-sm ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {selectedViolation.suspectedPeople.map((person, index) => (
                    <li key={index}>• {person}</li>
                  ))}
                </ul>
                <p className={`text-sm font-medium mt-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Relevant People:
                </p>
                <ul className={`mt-1 text-sm ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {selectedViolation.relevantPeople.map((person, index) => (
                    <li key={index}>• {person}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <p className={`text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Description:
              </p>
              <p className={`mt-1 text-sm leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {selectedViolation.description}
              </p>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {t('reviewer.form.reviewNotes')} *
              </label>
              <textarea
                value={reviewData.reviewNotes}
                onChange={(e) => setReviewData(prev => ({ ...prev, reviewNotes: e.target.value }))}
                placeholder={t('reviewer.form.reviewNotesPlaceholder')}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-vertical`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {t('reviewer.form.recommendation')} *
              </label>
              <textarea
                value={reviewData.recommendation}
                onChange={(e) => setReviewData(prev => ({ ...prev, recommendation: e.target.value }))}
                placeholder={t('reviewer.form.recommendationPlaceholder')}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-vertical`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {t('reviewer.form.status')} *
              </label>
              <select
                value={reviewData.newStatus}
                onChange={(e) => setReviewData(prev => ({ ...prev, newStatus: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                required
              >
                <option value="under_review">Under Review</option>
                <option value="resolved">Resolved</option>
                <option value="pending">Needs More Information</option>
              </select>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Submitting Review...</span>
                  </>
                ) : (
                  <span>{t('reviewer.form.submit')}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {t('reviewer.title')}
        </h1>
        <p className={`text-lg ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {t('reviewer.subtitle')}
        </p>
      </div>

      <div className={`rounded-xl shadow-lg ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-teal-500 border-t-transparent mx-auto mb-4" />
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Loading assigned violations...
            </p>
          </div>
        ) : assignedViolations.length === 0 ? (
          <div className="p-12 text-center">
            <FileCheck className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-lg font-semibold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              No Cases Assigned
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              You currently have no violation cases assigned for review.
            </p>
          </div>
        ) : (
          <div className="p-6">
            <h2 className={`text-2xl font-semibold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Assigned Cases ({assignedViolations.length})
            </h2>
            
            <div className="grid gap-4">
              {assignedViolations.map((violation) => (
                <div
                  key={violation.id}
                  className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg cursor-pointer ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 hover:border-teal-500' 
                      : 'bg-gray-50 border-gray-200 hover:border-teal-500 hover:bg-white'
                  }`}
                  onClick={() => handleViolationSelect(violation)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {getStatusIcon(violation.status || 'under_review')}
                        <h3 className={`text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {violation.type}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          violation.status === 'under_review'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : violation.status === 'resolved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {violation.status === 'under_review' ? 'Under Review' : violation.status}
                        </span>
                      </div>
                      
                      <p className={`text-sm mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <strong>Reference:</strong> {violation.referenceNumber}
                      </p>
                      
                      <p className={`text-sm mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <strong>Date:</strong> {violation.date} | <strong>Location:</strong> {violation.location}
                      </p>
                      
                      <p className={`text-sm leading-relaxed ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {violation.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-teal-500">
                      <span>Review Case</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviewer;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, X, Upload, FileText, Mail, CheckCircle } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { setSubmissionResult } from '../store/slices/violationSlice';

interface FormData {
  violationType: string;
  description: string;
  date: string;
  location: string;
  suspectedPeople: string[];
  relevantPeople: string[];
  attachments: File[];
}

const Almusfih: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isDark } = useAppSelector((state) => state.theme);
  const { submissionResult } = useAppSelector((state) => state.violation);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    violationType: '',
    description: '',
    date: '',
    location: '',
    suspectedPeople: [],
    relevantPeople: [],
    attachments: [],
  });

  const [newSuspectedPerson, setNewSuspectedPerson] = useState('');
  const [newRelevantPerson, setNewRelevantPerson] = useState('');
  const [notificationEmail, setNotificationEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const violationTypes = [
    'Financial Misconduct',
    'Ethical Violation',
    'Safety Violation',
    'Policy Breach',
    'Harassment',
    'Discrimination',
    'Other'
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSuspectedPerson = () => {
    if (newSuspectedPerson.trim()) {
      setFormData(prev => ({
        ...prev,
        suspectedPeople: [...prev.suspectedPeople, newSuspectedPerson.trim()]
      }));
      setNewSuspectedPerson('');
    }
  };

  const removeSuspectedPerson = (index: number) => {
    setFormData(prev => ({
      ...prev,
      suspectedPeople: prev.suspectedPeople.filter((_, i) => i !== index)
    }));
  };

  const addRelevantPerson = () => {
    if (newRelevantPerson.trim()) {
      setFormData(prev => ({
        ...prev,
        relevantPeople: [...prev.relevantPeople, newRelevantPerson.trim()]
      }));
      setNewRelevantPerson('');
    }
  };

  const removeRelevantPerson = (index: number) => {
    setFormData(prev => ({
      ...prev,
      relevantPeople: prev.relevantPeople.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual OAuth API integration
    setTimeout(() => {
      const referenceNumber = `VR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      dispatch(setSubmissionResult({ referenceNumber }));
      setIsSubmitting(false);
    }, 2000);
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email notification API call
    console.log('Notification email:', notificationEmail);
    alert('Notification subscription successful!');
  };

  if (submissionResult.isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className={`rounded-2xl p-8 text-center ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-xl`}>
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('report.success.title')}
            </h2>
          </div>
          
          <div className={`p-6 rounded-xl mb-8 ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('report.success.referenceNumber')}
            </h3>
            <p className="text-2xl font-mono font-bold text-red-500 mb-2">
              {submissionResult.referenceNumber}
            </p>
            <p className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('report.success.saveMessage')}
            </p>
          </div>

          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('report.success.notification.title')}
              </h3>
            </div>
            <p className={`text-sm mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('report.success.notification.description')}
            </p>
            
            <form onSubmit={handleNotificationSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                  placeholder={t('report.success.notification.emailPlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {t('report.success.notification.subscribe')}
              </button>
            </form>
          </div>

          <button
            onClick={() => navigate('/')}
            className={`mt-6 px-6 py-2 rounded-lg transition-colors ${
              isDark 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {t('report.title')}
        </h1>
        <p className={`text-lg ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {t('report.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`rounded-2xl p-8 shadow-xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Violation Type */}
          <div className="md:col-span-1">
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('report.form.violationType')} *
            </label>
            <select
              value={formData.violationType}
              onChange={(e) => handleInputChange('violationType', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-red-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-red-500'
              } focus:ring-2 focus:ring-red-500/20 focus:outline-none`}
              required
            >
              <option value="">{t('report.form.violationTypePlaceholder')}</option>
              {violationTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="md:col-span-1">
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('report.form.date')} *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-red-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-red-500'
              } focus:ring-2 focus:ring-red-500/20 focus:outline-none`}
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('report.form.description')} *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={t('report.form.descriptionPlaceholder')}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500'
              } focus:ring-2 focus:ring-red-500/20 focus:outline-none resize-vertical`}
              required
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('report.form.location')} *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder={t('report.form.locationPlaceholder')}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500'
              } focus:ring-2 focus:ring-red-500/20 focus:outline-none`}
              required
            />
          </div>

          {/* Suspected People */}
          <div className="md:col-span-1">
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('report.form.suspectedPeople')}
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSuspectedPerson}
                  onChange={(e) => setNewSuspectedPerson(e.target.value)}
                  placeholder={t('report.form.suspectedPeoplePlaceholder')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500'
                  } focus:ring-2 focus:ring-red-500/20 focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={addSuspectedPerson}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {formData.suspectedPeople.map((person, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>{person}</span>
                    <button
                      type="button"
                      onClick={() => removeSuspectedPerson(index)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Relevant People */}
          <div className="md:col-span-1">
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('report.form.relevantPeople')}
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newRelevantPerson}
                  onChange={(e) => setNewRelevantPerson(e.target.value)}
                  placeholder={t('report.form.relevantPeoplePlaceholder')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500'
                  } focus:ring-2 focus:ring-red-500/20 focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={addRelevantPerson}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {formData.relevantPeople.map((person, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>{person}</span>
                    <button
                      type="button"
                      onClick={() => removeRelevantPerson(index)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('report.form.attachments')}
            </label>
            <div className="space-y-4">
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDark 
                  ? 'border-gray-600 hover:border-red-500' 
                  : 'border-gray-300 hover:border-red-500'
              }`}>
                <Upload className={`w-8 h-8 mx-auto mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <p className={`text-sm mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Drag and drop files here or click to browse
                </p>
                <p className={`text-xs ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Supported: PDF, Excel, Word, PowerPoint, Images, Videos
                </p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  multiple
                  accept=".pdf,.xlsx,.xls,.docx,.doc,.pptx,.ppt,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-3 inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t('report.form.addAttachment')}
                </label>
              </div>
              
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                      isDark ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className={`text-sm font-medium ${
                            isDark ? 'text-gray-200' : 'text-gray-700'
                          }`}>
                            {file.name}
                          </p>
                          <p className={`text-xs ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>{t('report.form.submit')}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Almusfih;
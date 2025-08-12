import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Edit, Filter, Search, FileText } from 'lucide-react';
import { useAppSelector } from '../store/store';
import { ViolationData } from '../store/slices/violationSlice';

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useAppSelector((state) => state.theme);
  const [violations, setViolations] = useState<ViolationData[]>([]);
  const [filteredViolations, setFilteredViolations] = useState<ViolationData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedViolation, setSelectedViolation] = useState<ViolationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockViolations: ViolationData[] = [
      {
        id: 'VR-1704567890-abc123def',
        type: 'Financial Misconduct',
        description: 'Suspected unauthorized financial transactions in Q4 2024',
        date: '2024-12-15',
        location: 'Finance Department, Building A',
        suspectedPeople: ['John Doe', 'Jane Smith'],
        relevantPeople: ['Mike Johnson'],
        attachments: [],
        status: 'pending',
        submissionDate: '2024-12-20',
        referenceNumber: 'VR-1704567890-abc123def',
      },
      {
        id: 'VR-1704567891-def456ghi',
        type: 'Safety Violation',
        description: 'Equipment safety protocols not being followed in manufacturing',
        date: '2024-12-18',
        location: 'Manufacturing Floor B',
        suspectedPeople: ['Robert Wilson'],
        relevantPeople: ['Safety Manager'],
        attachments: [],
        status: 'under_review',
        submissionDate: '2024-12-19',
        referenceNumber: 'VR-1704567891-def456ghi',
      },
      {
        id: 'VR-1704567892-ghi789jkl',
        type: 'Harassment',
        description: 'Reports of workplace harassment affecting multiple employees',
        date: '2024-12-10',
        location: 'HR Department',
        suspectedPeople: ['Manager X'],
        relevantPeople: ['Witnesses A', 'Witnesses B'],
        attachments: [],
        status: 'resolved',
        submissionDate: '2024-12-11',
        referenceNumber: 'VR-1704567892-ghi789jkl',
      },
    ];

    setTimeout(() => {
      setViolations(mockViolations);
      setFilteredViolations(mockViolations);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter violations based on search and status
  useEffect(() => {
    let filtered = violations.filter((violation) => {
      const matchesSearch = 
        violation.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        violation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        violation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        violation.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || violation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    setFilteredViolations(filtered);
  }, [violations, searchTerm, statusFilter]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const handleViewDetails = (violation: ViolationData) => {
    setSelectedViolation(violation);
  };

  if (selectedViolation) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setSelectedViolation(null)}
            className={`text-blue-500 hover:text-blue-600 font-medium transition-colors`}
          >
            ← {t('common.back')}
          </button>
        </div>

        <div className={`rounded-2xl p-8 shadow-xl ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Violation Details
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                getStatusBadgeColor(selectedViolation.status || 'pending')
              }`}>
                {t(`admin.status.${selectedViolation.status || 'pending'}`)}
              </span>
            </div>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Reference: {selectedViolation.referenceNumber}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Violation Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Type
                  </label>
                  <p className={`text-base ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedViolation.type}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Date of Violation
                  </label>
                  <p className={`text-base ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedViolation.date}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Location
                  </label>
                  <p className={`text-base ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedViolation.location}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                People Involved
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Suspected People
                  </label>
                  <div className="space-y-1">
                    {selectedViolation.suspectedPeople.map((person, index) => (
                      <p key={index} className={`text-base ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        • {person}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Relevant People
                  </label>
                  <div className="space-y-1">
                    {selectedViolation.relevantPeople.map((person, index) => (
                      <p key={index} className={`text-base ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        • {person}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Description
              </label>
              <div className={`p-4 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`text-base leading-relaxed ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedViolation.description}
                </p>
              </div>
            </div>

            {selectedViolation.attachments.length > 0 && (
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Attachments ({selectedViolation.attachments.length})
                </label>
                <div className="grid gap-2">
                  {selectedViolation.attachments.map((file, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      isDark ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className={`text-sm ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {file.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex space-x-4">
            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Assign Reviewer
            </button>
            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Update Status
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {t('admin.title')}
        </h1>
        <p className={`text-lg ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {t('admin.subtitle')}
        </p>
      </div>

      {/* Filters */}
      <div className={`rounded-xl p-6 mb-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className={`absolute left-3 top-3 w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search by reference, type, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Filter className={`absolute left-3 top-3 w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Violations Table */}
      <div className={`rounded-xl shadow-lg overflow-hidden ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent mx-auto mb-4" />
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {t('common.loading')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-medium ${
                    isDark ? 'text-gray-200' : 'text-gray-600'
                  }`}>
                    {t('admin.table.reference')}
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-medium ${
                    isDark ? 'text-gray-200' : 'text-gray-600'
                  }`}>
                    {t('admin.table.type')}
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-medium ${
                    isDark ? 'text-gray-200' : 'text-gray-600'
                  }`}>
                    {t('admin.table.date')}
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-medium ${
                    isDark ? 'text-gray-200' : 'text-gray-600'
                  }`}>
                    {t('admin.table.location')}
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-medium ${
                    isDark ? 'text-gray-200' : 'text-gray-600'
                  }`}>
                    {t('admin.table.status')}
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-medium ${
                    isDark ? 'text-gray-200' : 'text-gray-600'
                  }`}>
                    {t('admin.table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredViolations.map((violation, index) => (
                  <tr
                    key={violation.id}
                    className={`hover:bg-opacity-50 transition-colors ${
                      isDark 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className={`px-6 py-4 text-sm font-mono ${
                      isDark ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {violation.referenceNumber}
                    </td>
                    <td className={`px-6 py-4 text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {violation.type}
                    </td>
                    <td className={`px-6 py-4 text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {violation.date}
                    </td>
                    <td className={`px-6 py-4 text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {violation.location}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        getStatusBadgeColor(violation.status || 'pending')
                      }`}>
                        {t(`admin.status.${violation.status || 'pending'}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(violation)}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          {t('admin.table.view')}
                        </button>
                        <button className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors">
                          <Edit className="w-4 h-4 mr-1" />
                          {t('admin.table.edit')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredViolations.length === 0 && !isLoading && (
              <div className="p-12 text-center">
                <p className={`text-lg ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No violations found matching your criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
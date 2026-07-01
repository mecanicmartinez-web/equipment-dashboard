import React, { useState } from 'react';
import { Card, Button, message, Upload, Progress, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { importService } from '../services/import';

const ImportEquipment: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);
      const response = await importService.importEquipment(file);
      setResult(response.data);
      message.success('Import completed');
    } catch (error: any) {
      message.error(error.response?.data?.error || 'Import failed');
    } finally {
      setLoading(false);
    }
    return false;
  };

  return (
    <Card title="Import Equipment from Excel">
      <div style={{ marginBottom: '20px' }}>
        <Upload
          beforeUpload={(file) => {
            if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
                file.type !== 'application/vnd.ms-excel') {
              message.error('Please upload an Excel file');
              return false;
            }
            handleUpload(file);
            return false;
          }}
          disabled={loading}
        >
          <Button icon={<UploadOutlined />} loading={loading}>
            Click to Upload Excel File
          </Button>
        </Upload>
      </div>

      {result && (
        <>
          <Alert
            message="Import Summary"
            description={`Total: ${result.total} | Success: ${result.successful} | Failed: ${result.failed}`}
            type={result.failed === 0 ? 'success' : 'warning'}
            showIcon
            style={{ marginBottom: '20px' }}
          />

          <div style={{ marginBottom: '10px' }}>
            <strong>Success Rate:</strong>
            <Progress
              percent={Math.round((result.successful / result.total) * 100)}
              status={result.failed === 0 ? 'success' : 'exception'}
            />
          </div>

          {result.errors.length > 0 && (
            <div>
              <strong>Errors:</strong>
              <ul>
                {result.errors.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <Alert
        message="Excel Format"
        description="Your Excel file should have columns: code, name, brand, model, serial_number, location, category, and optional spec_* columns for specifications"
        type="info"
        showIcon
        style={{ marginTop: '20px' }}
      />
    </Card>
  );
};

export default ImportEquipment;

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const FileUpload = ({ title, subtitle, onFileUpload, acceptedFiles, icon }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFiles,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <h4 className="text-lg font-medium text-gray-300 mb-2">{subtitle}</h4>
        <p className="text-sm text-gray-400">Upload the {title.toLowerCase()} you're applying for</p>
      </div>

      <div
        {...getRootProps()}
        className={`upload-zone cursor-pointer ${isDragActive ? 'drag-active' : ''}`}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ scale: isDragActive ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="mb-4">
            {icon}
          </div>
          
          {uploadedFile ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="text-green-400 mb-2">✓ File uploaded successfully!</div>
              <div className="text-white font-medium">{uploadedFile.name}</div>
              <div className="text-gray-400 text-sm">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
            </motion.div>
          ) : (
            <div className="text-center">
              <div className="text-white font-medium mb-2">
                {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
              </div>
              <div className="text-gray-400 text-sm mb-2">or click to browse</div>
              <div className="text-gray-500 text-xs">Supports: TXT,PDF,DOC,DOCX</div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FileUpload;
class FileUploader {
    static async uploadFile(file, category, metadata = {}) {
        // Simulate file upload process
        return new Promise((resolve) => {
            setTimeout(() => {
                const fileData = {
                    id: Date.now().toString(),
                    fileName: file.name,
                    fileType: this.getFileType(file.name),
                    fileSize: this.formatFileSize(file.size),
                    uploadDate: new Date().toISOString(),
                    category: category,
                    ...metadata
                };
                
                // In a real application, this would upload to a server
                console.log('Uploading file:', fileData);
                resolve(fileData);
            }, 2000);
        });
    }

    static getFileType(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const types = {
            'pdf': 'pdf',
            'doc': 'docx',
            'docx': 'docx',
            'ppt': 'pptx',
            'pptx': 'pptx',
            'jpg': 'jpg',
            'jpeg': 'jpg',
            'png': 'jpg',
            'zip': 'zip',
            'rar': 'zip'
        };
        return types[ext] || 'other';
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    static validateFile(file, allowedTypes = ['pdf', 'docx', 'pptx', 'jpg', 'zip']) {
        const fileType = this.getFileType(file.name);
        if (!allowedTypes.includes(fileType)) {
            throw new Error(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            throw new Error('File size too large. Maximum size is 10MB.');
        }

        return true;
    }
}
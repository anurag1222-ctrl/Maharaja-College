// js/dataHandler.js - ENHANCED VERSION
class DataHandler {
    static init() {
        console.log('Initializing data...');
        
        const defaults = {
            'school_users': [
                {
                    id: '1',
                    name: 'Rahul Sharma',
                    email: 'rahul@maharajacollege.ac.in',
                    password: 'hashed_password',
                    type: 'student',
                    rollNumber: 'BCA23001',
                    semester: '3',
                    course: 'BCA',
                    phone: '9876543210',
                    dob: '2002-05-15',
                    joinDate: '2023-07-01'
                },
                {
                    id: '2',
                    name: 'Dr. Sunita Verma',
                    email: 'sunita@maharajacollege.ac.in',
                    password: 'hashed_password',
                    type: 'teacher',
                    department: 'Computer Science',
                    designation: 'Assistant Professor',
                    phone: '9876543200',
                    dob: '1975-08-15',
                    joinDate: '2020-06-15'
                },
                {
                    id: '3',
                    name: 'Admin User',
                    email: 'admin@maharajacollege.ac.in',
                    password: 'hashed_password',
                    type: 'admin',
                    joinDate: '2020-01-01'
                }
            ],
            'school_student_profiles': [],
            'school_classes': [
                {
                    id: '1',
                    name: 'BCA Semester 3',
                    course: 'BCA',
                    semester: '3',
                    classTeacher: '2',
                    capacity: 60,
                    subjects: ['Java Programming', 'DBMS', 'Data Structures', 'Operating Systems']
                }
            ],
            'school_timetable': [],
            'school_attendance': [],
            'school_grades': [],
            'school_fee_management': [],
            'school_materials': [],
            'school_tests': [],
            'school_submissions': [],
            'school_notices': [],
            'school_messages': [],
            'school_activities': []
        };

        for (const [key, value] of Object.entries(defaults)) {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify(value));
                console.log(`Created ${key} with ${value.length} items`);
            }
        }

        console.log('Data initialization complete');
        console.log('Users:', this.getUsers());
    }

    // Enhanced getters with validation
    static getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        console.log('Current user:', user);
        return user;
    }

    static setCurrentUser(user) {
        console.log('Setting current user:', user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    static getUsers() {
        const users = JSON.parse(localStorage.getItem('school_users') || '[]');
        console.log(`Retrieved ${users.length} users`);
        return users;
    }

    static getStudentProfiles() {
        return JSON.parse(localStorage.getItem('school_student_profiles') || '[]');
    }

    static getClasses() {
        return JSON.parse(localStorage.getItem('school_classes') || '[]');
    }

    static getTimetable() {
        return JSON.parse(localStorage.getItem('school_timetable') || '[]');
    }

    static getAttendance() {
        return JSON.parse(localStorage.getItem('school_attendance') || '[]');
    }

    static getGrades() {
        return JSON.parse(localStorage.getItem('school_grades') || '[]');
    }

    static getFeeRecords() {
        return JSON.parse(localStorage.getItem('school_fee_management') || '[]');
    }

    static getMaterials() {
        return JSON.parse(localStorage.getItem('school_materials') || '[]');
    }

    static getTests() {
        return JSON.parse(localStorage.getItem('school_tests') || '[]');
    }

    static getSubmissions() {
        return JSON.parse(localStorage.getItem('school_submissions') || '[]');
    }

    static getNotices() {
        return JSON.parse(localStorage.getItem('school_notices') || '[]');
    }

    static getMessages() {
        return JSON.parse(localStorage.getItem('school_messages') || '[]');
    }

    static getActivities() {
        return JSON.parse(localStorage.getItem('school_activities') || '[]');
    }

    // Enhanced adders with validation
    static addUser(user) {
        const users = this.getUsers();
        
        // Check if user already exists
        const exists = users.some(u => 
            u.email === user.email || (u.type === 'student' && u.rollNumber === user.rollNumber)
        );
        
        if (!exists) {
            users.push(user);
            this.saveToStorage('school_users', users);
            console.log('User added:', user.name);
            return user;
        } else {
            console.log('User already exists:', user.name);
            throw new Error('User already exists');
        }
    }

    static addStudentProfile(profile) {
        const profiles = this.getStudentProfiles();
        profiles.push(profile);
        this.saveToStorage('school_student_profiles', profiles);
        return profile;
    }

    static addClass(classData) {
        const classes = this.getClasses();
        classes.push(classData);
        this.saveToStorage('school_classes', classes);
        return classData;
    }

    static addTimetableEntry(entry) {
        const timetable = this.getTimetable();
        timetable.push(entry);
        this.saveToStorage('school_timetable', timetable);
        return entry;
    }

    static markAttendance(attendance) {
        const records = this.getAttendance();
        
        // Remove existing record for same student and date
        const filtered = records.filter(record => 
            !(record.studentId === attendance.studentId && record.date === attendance.date)
        );
        
        filtered.push(attendance);
        this.saveToStorage('school_attendance', filtered);
        return attendance;
    }

    static addGrade(grade) {
        const grades = this.getGrades();
        grades.push(grade);
        this.saveToStorage('school_grades', grades);
        return grade;
    }

    static addFeeRecord(record) {
        const records = this.getFeeRecords();
        records.push(record);
        this.saveToStorage('school_fee_management', records);
        return record;
    }

    static addMaterial(material) {
        const materials = this.getMaterials();
        materials.push(material);
        this.saveToStorage('school_materials', materials);
        return material;
    }

    static addTest(test) {
        const tests = this.getTests();
        tests.push(test);
        this.saveToStorage('school_tests', tests);
        return test;
    }

    static addSubmission(submission) {
        const submissions = this.getSubmissions();
        submissions.push(submission);
        this.saveToStorage('school_submissions', submissions);
        return submission;
    }

    static addNotice(notice) {
        const notices = this.getNotices();
        notices.push(notice);
        this.saveToStorage('school_notices', notices);
        return notice;
    }

    static addMessage(message) {
        const messages = this.getMessages();
        messages.push(message);
        this.saveToStorage('school_messages', messages);
        return message;
    }

    static addActivity(activity) {
        const activities = this.getActivities();
        activities.push(activity);
        this.saveToStorage('school_activities', activities);
        return activity;
    }

    // Enhanced fee payment update
    static updateFeePayment(recordId, paymentData) {
        const records = this.getFeeRecords();
        const index = records.findIndex(r => r.id === recordId);
        
        if (index !== -1) {
            if (!records[index].payments) {
                records[index].payments = [];
            }
            
            records[index].payments.push(paymentData);
            records[index].paidAmount = (records[index].paidAmount || 0) + paymentData.amount;
            records[index].balance = records[index].totalAmount - records[index].paidAmount;
            records[index].status = records[index].balance === 0 ? 'Paid' : 
                                  records[index].paidAmount > 0 ? 'Partial' : 'Pending';
            
            this.saveToStorage('school_fee_management', records);
            return records[index];
        }
        return null;
    }

    // Utility methods
    static saveToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`Saved ${data.length} items to ${key}`);
    }

    static logout() {
        console.log('Logging out user');
        localStorage.removeItem('currentUser');
    }

    static userExists(email) {
        const users = this.getUsers();
        return users.some(user => user.email === email);
    }

    static deleteUser(userId) {
        const users = this.getUsers().filter(u => u.id !== userId);
        this.saveToStorage('school_users', users);
        console.log('User deleted:', userId);
    }

    static importUserData(jsonData) {
        const users = this.getUsers();
        const importedUsers = jsonData.map(student => ({
            id: Date.now().toString() + Math.random(),
            name: student.name,
            email: student.email || `${student.rollNumber?.toLowerCase()}@maharajacollege.ac.in`,
            password: 'hashed_default_password',
            type: 'student',
            rollNumber: student.rollNumber,
            semester: student.semester || '3',
            course: student.course || 'BCA',
            phone: student.phone,
            dob: student.dob,
            joinDate: new Date().toISOString().split('T')[0]
        }));
        
        users.push(...importedUsers);
        this.saveToStorage('school_users', users);
        return importedUsers;
    }

    static getStudentStats() {
        const users = this.getUsers().filter(u => u.type === 'student');
        const submissions = this.getSubmissions();
        
        return users.map(student => {
            const studentSubmissions = submissions.filter(s => s.studentId === student.id);
            const testsAttempted = studentSubmissions.length;
            const averageScore = testsAttempted > 0 
                ? (studentSubmissions.reduce((acc, s) => acc + parseFloat(s.percentage), 0) / testsAttempted).toFixed(2)
                : 0;
            
            return {
                id: student.id,
                name: student.name,
                rollNumber: student.rollNumber,
                testsAttempted,
                averageScore,
                lastActivity: studentSubmissions.length > 0 
                    ? studentSubmissions[studentSubmissions.length - 1].submittedAt 
                    : student.joinDate
            };
        });
    }

    static exportData(data, filename, type = 'application/json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log(`Exported data to ${filename}`);
    }

    // Debug method to check all data
    static debugData() {
        console.log('=== DATA DEBUG INFO ===');
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                console.log(`${key}:`, Array.isArray(data) ? `${data.length} items` : data);
            } catch (e) {
                console.log(`${key}:`, localStorage.getItem(key));
            }
        });
        console.log('=== END DEBUG INFO ===');
    }
}

// Auto-initialize when script loads
DataHandler.init();
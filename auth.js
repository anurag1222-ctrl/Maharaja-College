// js/auth.js - FINAL FIXED VERSION
class Auth {
    static login(email, password, userType) {
        const users = DataHandler.getUsers();
        console.log('🔍 Available users:', users.map(u => `${u.name} (${u.type})`));
        console.log('🔍 Searching for:', { email, userType });
        
        // Clean the input
        const cleanEmail = email.trim().toLowerCase();
        
        // Find user by name or email (case insensitive, flexible matching)
        const user = users.find(u => {
            const cleanUserName = u.name.trim().toLowerCase();
            const cleanUserEmail = u.email ? u.email.trim().toLowerCase() : '';
            const typeMatch = u.type === userType;
            
            const nameMatch = cleanUserName === cleanEmail;
            const emailMatch = cleanUserEmail === cleanEmail;
            const partialMatch = cleanUserName.includes(cleanEmail) || cleanEmail.includes(cleanUserName);
            
            console.log(`🔍 Checking: "${u.name}" vs "${email}" - nameMatch: ${nameMatch}, emailMatch: ${emailMatch}, partialMatch: ${partialMatch}, typeMatch: ${typeMatch}`);
            
            return (nameMatch || emailMatch || partialMatch) && typeMatch;
        });

        if (!user) {
            const availableUsers = users.filter(u => u.type === userType).map(u => u.name);
            throw new Error(`User "${email}" not found as ${userType}. Available ${userType}s: ${availableUsers.join(', ') || 'None'}`);
        }

        console.log('✅ User found:', user.name);

        // Password validation - FLEXIBLE
        let passwordValid = false;
        
        if (user.type === 'admin') {
            // Admin uses fixed password
            passwordValid = password === '123456';
            if (!passwordValid) {
                throw new Error('Invalid admin password. Use: 123456');
            }
        } else {
            // For students/teachers, check multiple password options
            if (user.dob) {
                const dobPassword1 = user.dob.replace(/-/g, ''); // YYYYMMDD
                const dobPassword2 = user.dob.split('-').reverse().join(''); // DDMMYYYY (alternative)
                
                passwordValid = password === dobPassword1 || password === dobPassword2;
                console.log(`🔑 Password check - Input: ${password}, DOB1: ${dobPassword1}, DOB2: ${dobPassword2}, Valid: ${passwordValid}`);
            }
            
            // Fallback to default password
            if (!passwordValid) {
                passwordValid = password === '123456';
                console.log(`🔑 Default password check - Valid: ${passwordValid}`);
            }
            
            if (!passwordValid) {
                throw new Error(`Invalid password. Try: DOB (${user.dob ? user.dob.replace(/-/g, '') : 'N/A'}) or default password: 123456`);
            }
        }

        console.log('🎉 Login successful for:', user.name);
        return user;
    }

    // Alternative simple login for debugging
    static simpleLogin(name, userType) {
        const users = DataHandler.getUsers();
        const cleanName = name.trim().toLowerCase();
        
        const user = users.find(u => 
            u.name.trim().toLowerCase() === cleanName && 
            u.type === userType
        );
        
        if (!user) {
            throw new Error(`User "${name}" not found as ${userType}`);
        }
        
        return user;
    }
}
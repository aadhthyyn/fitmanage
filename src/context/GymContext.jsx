import React, { createContext, useContext, useState, useEffect } from 'react';

const GymContext = createContext(null);

const INITIAL_MEMBERS = [
  {
    id: 'MEM-001',
    name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    phone: '+1 (555) 234-8901',
    plan: 'VIP Black Card',
    status: 'Active',
    joinDate: '2025-01-15',
    expiryDate: '2026-12-31',
    assignedTrainer: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    gender: 'Male',
    age: 29,
    weight: '82 kg',
    height: '184 cm',
    attendanceRate: '94%',
    emergencyContact: '+1 (555) 998-1122 (Wife)',
    address: '742 Evergreen Terrace, Springfield',
  },
  {
    id: 'MEM-002',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 345-6789',
    plan: 'Elite Athlete',
    status: 'Active',
    joinDate: '2025-03-10',
    expiryDate: '2026-11-20',
    assignedTrainer: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    gender: 'Female',
    age: 26,
    weight: '58 kg',
    height: '168 cm',
    attendanceRate: '88%',
    emergencyContact: '+1 (555) 334-9988 (Mother)',
    address: '124 Ocean Breeze Ave, Miami',
  },
  {
    id: 'MEM-003',
    name: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 456-7890',
    plan: 'Pro Fitness',
    status: 'Expiring',
    joinDate: '2025-06-01',
    expiryDate: '2026-10-25',
    assignedTrainer: 'James Thorne',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    gender: 'Male',
    age: 34,
    weight: '76 kg',
    height: '178 cm',
    attendanceRate: '75%',
    emergencyContact: '+1 (555) 777-6655 (Brother)',
    address: '58 Broadway, New York',
  },
  {
    id: 'MEM-004',
    name: 'Sophia Williams',
    email: 'sophia.w@example.com',
    phone: '+1 (555) 567-8901',
    plan: 'Standard Starter',
    status: 'Inactive',
    joinDate: '2025-02-18',
    expiryDate: '2026-08-18',
    assignedTrainer: 'None Assigned',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    gender: 'Female',
    age: 31,
    weight: '64 kg',
    height: '170 cm',
    attendanceRate: '42%',
    emergencyContact: '+1 (555) 888-2233 (Father)',
    address: '302 Elm Street, Austin',
  },
  {
    id: 'MEM-005',
    name: 'Jordan Miller',
    email: 'jordan.m@example.com',
    phone: '+1 (555) 678-9012',
    plan: 'VIP Black Card',
    status: 'Active',
    joinDate: '2025-08-05',
    expiryDate: '2027-02-05',
    assignedTrainer: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    gender: 'Male',
    age: 28,
    weight: '86 kg',
    height: '188 cm',
    attendanceRate: '96%',
    emergencyContact: '+1 (555) 443-1199 (Partner)',
    address: '88 Sunset Blvd, Los Angeles',
  },
  {
    id: 'MEM-006',
    name: 'Amara Okafor',
    email: 'amara.o@example.com',
    phone: '+1 (555) 789-0123',
    plan: 'Elite Athlete',
    status: 'Active',
    joinDate: '2025-09-12',
    expiryDate: '2027-03-12',
    assignedTrainer: 'Mia Zhang',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
    gender: 'Female',
    age: 25,
    weight: '60 kg',
    height: '173 cm',
    attendanceRate: '91%',
    emergencyContact: '+1 (555) 122-8877 (Sister)',
    address: '414 Michigan Ave, Chicago',
  },
  {
    id: 'MEM-007',
    name: 'Lucas Sterling',
    email: 'lucas.s@example.com',
    phone: '+1 (555) 890-1234',
    plan: 'Pro Fitness',
    status: 'Expiring',
    joinDate: '2025-04-20',
    expiryDate: '2026-10-30',
    assignedTrainer: 'James Thorne',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    gender: 'Male',
    age: 38,
    weight: '90 kg',
    height: '180 cm',
    attendanceRate: '79%',
    emergencyContact: '+1 (555) 667-8899 (Wife)',
    address: '19 Pine Road, Seattle',
  },
  {
    id: 'MEM-008',
    name: 'Chloe Bennett',
    email: 'chloe.b@example.com',
    phone: '+1 (555) 901-2345',
    plan: 'Standard Starter',
    status: 'Active',
    joinDate: '2025-10-01',
    expiryDate: '2026-11-01',
    assignedTrainer: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    gender: 'Female',
    age: 27,
    weight: '55 kg',
    height: '165 cm',
    attendanceRate: '85%',
    emergencyContact: '+1 (555) 998-3344 (Mother)',
    address: '904 Market St, San Francisco',
  },
];

const INITIAL_MEMBERSHIPS = [
  {
    id: 'PLAN-01',
    name: 'Standard Starter',
    price: 39,
    billingCycle: 'monthly',
    duration: '1 Month',
    badge: 'Basic Tier',
    highlight: false,
    description: 'Perfect for casual gym goers looking for essential equipment access.',
    features: [
      'Full Gym Floor Access (6 AM - 10 PM)',
      'Modern Locker Room & Showers',
      'ManageFit Member Mobile App',
      'Free High-Speed Wi-Fi',
      '1 Fitness Orientation Session',
    ],
    popular: false,
    activeMembers: 312,
  },
  {
    id: 'PLAN-02',
    name: 'Pro Fitness',
    price: 69,
    billingCycle: 'monthly',
    duration: '3 Months',
    badge: 'Most Popular',
    highlight: true,
    description: 'Our most popular plan with unlimited classes, sauna, and trainer coaching.',
    features: [
      'Everything in Standard Starter',
      '24/7 Unlimited Gym Access',
      'Unlimited Group Fitness & Spin Classes',
      'Sauna, Steam Room & Hydro-massage',
      '1 Free Personal Training Session / month',
      'Monthly InBody Body Composition Scan',
    ],
    popular: true,
    activeMembers: 580,
  },
  {
    id: 'PLAN-03',
    name: 'Elite Athlete',
    price: 119,
    billingCycle: 'monthly',
    duration: '6 Months',
    badge: 'High Performance',
    highlight: false,
    description: 'Designed for serious athletes who demand personalized nutrition and coaching.',
    features: [
      'Everything in Pro Fitness',
      '4 Personal Training Sessions / month',
      'Custom Nutrition & Diet Blueprint',
      'Cryotherapy & Recovery Lounge Access',
      'Dedicated Locker in Executive Locker Room',
      'Priority Class Booking & Guest Passes',
    ],
    popular: false,
    activeMembers: 245,
  },
  {
    id: 'PLAN-04',
    name: 'VIP Black Card',
    price: 199,
    billingCycle: 'monthly',
    duration: '12 Months',
    badge: 'All-Inclusive',
    highlight: false,
    description: 'The pinnacle luxury gym experience with all-inclusive amenities and dedicated concierge.',
    features: [
      'Everything in Elite Athlete',
      'Unlimited 1-on-1 Personal Training',
      'Complimentary Protein Shake Bar Daily',
      'Fresh Towel & Laundry Service',
      'Unlimited Guest Privileges Anytime',
      'Access to All 14 FitManage Global Locations',
    ],
    popular: false,
    activeMembers: 147,
  },
];

const INITIAL_TRAINERS = [
  {
    id: 'TRN-01',
    name: 'Alex Rivera',
    role: 'Head Strength & Conditioning Coach',
    specialization: 'Hypertrophy & Olympic Lifting',
    rating: 4.9,
    reviewsCount: 128,
    activeClients: 24,
    experience: '8+ Years',
    phone: '+1 (555) 112-4455',
    email: 'alex.rivera@fitmanage.com',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=250&q=80',
    status: 'Available',
    bio: 'Former collegiate powerlifting coach passionate about biomechanics, progressive overload, and athlete longevity.',
  },
  {
    id: 'TRN-02',
    name: 'Sarah Jenkins',
    role: 'Senior HIIT & Athletic Performance Coach',
    specialization: 'Endurance & Fat Loss',
    rating: 4.95,
    reviewsCount: 154,
    activeClients: 28,
    experience: '6 Years',
    phone: '+1 (555) 223-5566',
    email: 'sarah.j@fitmanage.com',
    avatar: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=250&q=80',
    status: 'Available',
    bio: 'Certified CSCS and endurance specialist helping members break metabolic plateaus and build mental toughness.',
  },
  {
    id: 'TRN-03',
    name: 'James Thorne',
    role: 'CrossFit & Functional Movement Coach',
    specialization: 'Mobility & Functional Power',
    rating: 4.85,
    reviewsCount: 96,
    activeClients: 19,
    experience: '7 Years',
    phone: '+1 (555) 334-6677',
    email: 'james.t@fitmanage.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    status: 'Busy',
    bio: 'Level 3 CrossFit trainer focused on clean technique, injury prevention, and explosive functional fitness.',
  },
  {
    id: 'TRN-04',
    name: 'Mia Zhang',
    role: 'Holistic Yoga & Recovery Specialist',
    specialization: 'Flexibility, Vinyasa & Core',
    rating: 4.98,
    reviewsCount: 182,
    activeClients: 32,
    experience: '5 Years',
    phone: '+1 (555) 445-7788',
    email: 'mia.zhang@fitmanage.com',
    avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=250&q=80',
    status: 'Available',
    bio: 'Registered 500-hr RYT yoga instructor combining restorative breathwork, myofascial release, and posture correction.',
  },
];

const INITIAL_ATTENDANCE = [
  {
    id: 'ATT-101',
    memberId: 'MEM-001',
    memberName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    plan: 'VIP Black Card',
    date: '2026-10-14',
    checkInTime: '06:45 AM',
    checkOutTime: '08:15 AM',
    status: 'Present',
    zone: 'Main Gym Floor',
  },
  {
    id: 'ATT-102',
    memberId: 'MEM-002',
    memberName: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    plan: 'Elite Athlete',
    date: '2026-10-14',
    checkInTime: '07:15 AM',
    checkOutTime: '08:45 AM',
    status: 'Present',
    zone: 'Studio B (Spin)',
  },
  {
    id: 'ATT-103',
    memberId: 'MEM-003',
    memberName: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    plan: 'Pro Fitness',
    date: '2026-10-14',
    checkInTime: '12:30 PM',
    checkOutTime: '01:45 PM',
    status: 'Present',
    zone: 'CrossFit Box',
  },
  {
    id: 'ATT-104',
    memberId: 'MEM-004',
    memberName: 'Sophia Williams',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    plan: 'Standard Starter',
    date: '2026-10-14',
    checkInTime: '-',
    checkOutTime: '-',
    status: 'Absent',
    zone: '-',
  },
  {
    id: 'ATT-105',
    memberId: 'MEM-005',
    memberName: 'Jordan Miller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    plan: 'VIP Black Card',
    date: '2026-10-14',
    checkInTime: '05:30 PM',
    checkOutTime: 'In Session',
    status: 'Present',
    zone: 'Executive Free Weights',
  },
  {
    id: 'ATT-106',
    memberId: 'MEM-006',
    memberName: 'Amara Okafor',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
    plan: 'Elite Athlete',
    date: '2026-10-14',
    checkInTime: '06:00 PM',
    checkOutTime: 'In Session',
    status: 'Present',
    zone: 'Recovery Lounge & Sauna',
  },
];

export const GymProvider = ({ children }) => {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('fitmanage_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [memberships, setMemberships] = useState(() => {
    const saved = localStorage.getItem('fitmanage_memberships');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERSHIPS;
  });

  const [trainers, setTrainers] = useState(() => {
    const saved = localStorage.getItem('fitmanage_trainers');
    return saved ? JSON.parse(saved) : INITIAL_TRAINERS;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('fitmanage_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('fitmanage_profile');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Alex Vance',
          role: 'General Manager & Head Trainer',
          email: 'alex.vance@fitmanage.com',
          phone: '+1 (555) 880-3344',
          gymName: 'FitManage Club Pro Downtown',
          location: '742 Broadway Blvd, Suite 400, New York, NY',
          operatingHours: 'Monday - Sunday: 5:00 AM - 11:00 PM',
          capacity: '850 Members Peak',
          currency: 'USD ($)',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          notifications: {
            memberExpiryAlert: true,
            dailyAttendanceReport: true,
            trainerScheduleChanges: false,
            revenueMilestones: true,
          },
        };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('fitmanage_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('fitmanage_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('fitmanage_memberships', JSON.stringify(memberships));
  }, [memberships]);

  useEffect(() => {
    localStorage.setItem('fitmanage_trainers', JSON.stringify(trainers));
  }, [trainers]);

  useEffect(() => {
    localStorage.setItem('fitmanage_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('fitmanage_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Member CRUD
  const addMember = (newMember) => {
    const id = `MEM-${String(members.length + 1).padStart(3, '0')}`;
    const memberToAdd = {
      ...newMember,
      id,
      avatar: newMember.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      joinDate: newMember.joinDate || new Date().toISOString().split('T')[0],
      attendanceRate: newMember.attendanceRate || '100%',
    };
    setMembers((prev) => [memberToAdd, ...prev]);
    return memberToAdd;
  };

  const updateMember = (id, updatedFields) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updatedFields } : m))
    );
  };

  const deleteMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setAttendance((prev) => prev.filter((a) => a.memberId !== id));
  };

  const getMemberById = (id) => {
    return members.find((m) => m.id === id);
  };

  // Attendance
  const markAttendance = (memberId, status = 'Present', zone = 'Main Gym Floor') => {
    const member = members.find((m) => m.id === memberId);
    if (!member) return;

    const existingIndex = attendance.findIndex(
      (a) => a.memberId === memberId && a.date === new Date().toISOString().split('T')[0]
    );

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (existingIndex >= 0) {
      setAttendance((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                status,
                zone: status === 'Present' ? zone : '-',
                checkInTime: status === 'Present' ? (item.checkInTime === '-' ? nowTime : item.checkInTime) : '-',
                checkOutTime: status === 'Present' ? 'In Session' : '-',
              }
            : item
        )
      );
    } else {
      const newRecord = {
        id: `ATT-${Date.now().toString().slice(-4)}`,
        memberId: member.id,
        memberName: member.name,
        avatar: member.avatar,
        plan: member.plan,
        date: new Date().toISOString().split('T')[0],
        checkInTime: status === 'Present' ? nowTime : '-',
        checkOutTime: status === 'Present' ? 'In Session' : '-',
        status,
        zone: status === 'Present' ? zone : '-',
      };
      setAttendance((prev) => [newRecord, ...prev]);
    }
  };

  // Auth
  const login = (email, password) => {
    setIsAuthenticated(true);
    localStorage.setItem('fitmanage_auth', 'true');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('fitmanage_auth');
  };

  return (
    <GymContext.Provider
      value={{
        members,
        memberships,
        trainers,
        attendance,
        userProfile,
        setUserProfile,
        isAuthenticated,
        login,
        logout,
        addMember,
        updateMember,
        deleteMember,
        getMemberById,
        markAttendance,
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};

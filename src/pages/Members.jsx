import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  MenuItem,
  InputAdornment,
  Stack,
  Tooltip,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import MemberForm from '../components/MemberForm';
import DeleteConfirm from '../components/DeleteConfirm';
import { useGym } from '../context/GymContext';

export const Members = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { members, deleteMember, memberships } = useGym();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal states
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedMemberToEdit, setSelectedMemberToEdit] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  // Filtered members
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone.includes(searchTerm) ||
        member.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
      const matchesPlan = planFilter === 'All' || member.plan === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [members, searchTerm, statusFilter, planFilter]);

  const handleEditClick = (e, member) => {
    e.stopPropagation();
    setSelectedMemberToEdit(member);
    setOpenFormModal(true);
  };

  const handleDeleteClick = (e, member) => {
    e.stopPropagation();
    setMemberToDelete(member);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (memberToDelete) {
      deleteMember(memberToDelete.id);
      setOpenDeleteModal(false);
      setMemberToDelete(null);
    }
  };

  const handleOpenAdd = () => {
    setSelectedMemberToEdit(null);
    setOpenFormModal(true);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Page Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 3.5,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#171A1F', letterSpacing: '-0.02em' }}>
              Gym Members Directory
            </Typography>
            <Chip
              label={`${filteredMembers.length} Members`}
              size="small"
              sx={{
                backgroundColor: '#171A1F',
                color: '#B7F34A',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Manage member accounts, track active subscription plans, and update personal information.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<PersonAddAlt1RoundedIcon />}
          onClick={handleOpenAdd}
          sx={{
            backgroundColor: '#B7F34A',
            color: '#171A1F',
            fontWeight: 700,
            py: 1.1,
            px: 2.8,
            borderRadius: '10px',
            boxShadow: '0 4px 14px rgba(183, 243, 74, 0.35)',
            '&:hover': {
              backgroundColor: '#A3E337',
              boxShadow: '0 6px 20px rgba(183, 243, 74, 0.45)',
            },
          }}
        >
          Add New Member
        </Button>
      </Box>

      {/* Filter and Search Card */}
      <Card
        sx={{
          p: 2.5,
          borderRadius: '16px',
          border: '1px solid #E6E8EC',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          mb: 3,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
        >
          {/* Search Input */}
          <TextField
            placeholder="Search by name, email, phone, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ flex: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ flex: 1 }}>
            {/* Status Filter */}
            <TextField
              select
              label="Membership Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Expiring">Expiring Soon</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>

            {/* Plan Filter */}
            <TextField
              select
              label="Plan Tier"
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 170 }}
            >
              <MenuItem value="All">All Membership Plans</MenuItem>
              {memberships.map((p) => (
                <MenuItem key={p.id} value={p.name}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>
      </Card>

      {/* Members Table */}
      <Card
        sx={{
          borderRadius: '16px',
          border: '1px solid #E6E8EC',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member Name & ID</TableCell>
                <TableCell>Contact Details</TableCell>
                <TableCell>Membership Tier</TableCell>
                <TableCell>Assigned Trainer</TableCell>
                <TableCell>Expiration Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ py: 6, textAlign: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#171A1F', mb: 0.5 }}>
                      No gym members found matching criteria
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Try adjusting your search terms or clearing your filters.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((member) => (
                    <TableRow
                      key={member.id}
                      hover
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#F8FAFC !important' },
                      }}
                      onClick={() => navigate(`/members/${member.id}`)}
                    >
                      {/* Name & ID */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
                          <Avatar
                            src={member.avatar}
                            alt={member.name}
                            sx={{ width: 44, height: 44, borderRadius: '12px' }}
                          />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#171A1F' }}>
                              {member.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: '#64748B',
                                backgroundColor: '#F1F5F9',
                                px: 0.8,
                                py: 0.2,
                                borderRadius: '4px',
                                fontWeight: 600,
                              }}
                            >
                              {member.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Contact */}
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ color: '#171A1F', fontWeight: 500 }}>
                            {member.email}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748B' }}>
                            {member.phone}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Plan */}
                      <TableCell>
                        <Chip
                          label={member.plan}
                          size="small"
                          sx={{
                            backgroundColor:
                              member.plan === 'VIP Black Card'
                                ? '#171A1F'
                                : member.plan === 'Elite Athlete'
                                ? '#E0F2FE'
                                : member.plan === 'Pro Fitness'
                                ? '#DCFCE7'
                                : '#F1F5F9',
                            color:
                              member.plan === 'VIP Black Card'
                                ? '#B7F34A'
                                : member.plan === 'Elite Athlete'
                                ? '#0369A1'
                                : member.plan === 'Pro Fitness'
                                ? '#15803D'
                                : '#475569',
                            fontWeight: 700,
                            fontSize: '0.72rem',
                          }}
                        />
                      </TableCell>

                      {/* Trainer */}
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#171A1F', fontWeight: 500 }}>
                          {member.assignedTrainer}
                        </Typography>
                      </TableCell>

                      {/* Expiry */}
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#171A1F' }}>
                          {member.expiryDate}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>
                          Enrolled: {member.joinDate}
                        </Typography>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Chip
                          label={member.status}
                          size="small"
                          sx={{
                            backgroundColor:
                              member.status === 'Active'
                                ? '#DCFCE7'
                                : member.status === 'Expiring'
                                ? '#FFEDD5'
                                : '#FEE2E2',
                            color:
                              member.status === 'Active'
                                ? '#15803D'
                                : member.status === 'Expiring'
                                ? '#C2410C'
                                : '#B91C1C',
                            fontWeight: 700,
                            fontSize: '0.72rem',
                          }}
                        />
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="right">
                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                          <Tooltip title="View Member Profile">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/members/${member.id}`);
                              }}
                              sx={{
                                color: '#475569',
                                '&:hover': { color: '#171A1F', backgroundColor: '#F1F5F9' },
                              }}
                            >
                              <VisibilityRoundedIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit Member">
                            <IconButton
                              size="small"
                              onClick={(e) => handleEditClick(e, member)}
                              sx={{
                                color: '#475569',
                                '&:hover': { color: '#0284C7', backgroundColor: '#E0F2FE' },
                              }}
                            >
                              <EditRoundedIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete Member">
                            <IconButton
                              size="small"
                              onClick={(e) => handleDeleteClick(e, member)}
                              sx={{
                                color: '#94A3B8',
                                '&:hover': { color: '#DC2626', backgroundColor: '#FEE2E2' },
                              }}
                            >
                              <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredMembers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sx={{
            borderTop: '1px solid #E6E8EC',
            backgroundColor: '#FAFAFA',
          }}
        />
      </Card>

      {/* Member Form Modal */}
      <MemberForm
        open={openFormModal}
        onClose={() => setOpenFormModal(false)}
        memberToEdit={selectedMemberToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirm
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        memberName={memberToDelete?.name}
      />
    </Box>
  );
};
export default Members;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
} from "@mui/material";
import { Add, Delete, Save, History } from "@mui/icons-material";
import axios from "axios";

const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

const ExpenseSplitter = () => {
  const [members, setMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState("");
  const [expenses, setExpenses] = useState<number[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency");
    if (storedCurrency) setCurrency(storedCurrency);

    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:5001/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const addMember = () => {
    if (newMember.trim()) {
      setMembers([...members, newMember]);
      setExpenses([...expenses, 0]);
      setNewMember("");
    }
  };

  const removeMember = (index: number) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setMembers(updatedMembers);
    setExpenses(updatedExpenses);
    setTotalExpense(updatedExpenses.reduce((sum, val) => sum + val, 0));
  };

  const updateExpense = (index: number, amount: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = amount;
    setExpenses(updatedExpenses);
    setTotalExpense(updatedExpenses.reduce((sum, val) => sum + val, 0));
  };

  const saveExpense = async () => {
    if (members.length > 0) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated! Please log in.");
        return;
      }

      try {
        const expenseData = { members, expenses, total: totalExpense, currency };
        await axios.post("http://localhost:5001/api/expenses", expenseData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Expense saved successfully!");
        setMembers([]);
        setExpenses([]);
        setTotalExpense(0);
        fetchExpenses(); // Refresh saved expenses list
      } catch (error) {
        console.error("Error saving expense:", error);
        alert("Failed to save expense!");
      }
    }
  };

  const deleteExpense = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5001/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F0F4F8", padding: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center", color: "#2D9CDB", mb: 4 }}>
        💰 Expense Splitter
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)" }}>
            <Typography variant="h5" sx={{ color: "#2D9CDB", mb: 2 }}>
              👥 Add Members
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
              <TextField label="Member Name" value={newMember} onChange={(e) => setNewMember(e.target.value)} fullWidth />
              <Button variant="contained" onClick={addMember} sx={{ backgroundColor: "#27AE60" }} startIcon={<Add />}>
                Add
              </Button>
            </Box>
            <Select value={currency} onChange={(e) => setCurrency(e.target.value)} fullWidth sx={{ mb: 3 }}>
              {currencies.map((cur) => (
                <MenuItem key={cur} value={cur}>{cur}</MenuItem>
              ))}
            </Select>

            <List>
              {members.map((member, index) => (
                <ListItem key={index} sx={{ bgcolor: "#FAFAFA", borderRadius: 2, mb: 2 }}>
                  <ListItemText primary={member} />
                  <TextField
                    label="Expense"
                    type="number"
                    value={expenses[index]}
                    onChange={(e) => updateExpense(index, parseFloat(e.target.value) || 0)}
                    sx={{ width: 120 }}
                  />
                  <Tooltip title="Remove">
                    <IconButton onClick={() => removeMember(index)} sx={{ ml: 2, color: "#E74C3C" }}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 3 }} />
            <Typography variant="h6">
              💵 Total Expense: <span style={{ color: "#2D9CDB" }}>{currency} {totalExpense.toFixed(2)}</span>
            </Typography>
            <Typography variant="h6">
              🔥 Each Member Owes: <span style={{ color: "#27AE60" }}>{currency} {(totalExpense / members.length || 0).toFixed(2)}</span>
            </Typography>

            <Button variant="contained" fullWidth onClick={saveExpense} sx={{ mt: 3, backgroundColor: "#2D9CDB" }} startIcon={<Save />}>
              Save Expense
            </Button>
          </Paper>

          <Paper sx={{ marginTop: 4, padding: 4, borderRadius: 3, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)" }}>
            <Typography variant="h5" sx={{ color: "#2D9CDB", mb: 2 }}>
              📜 Saved Expenses
            </Typography>
            <List>
              {history.map((expense) => (
                <ListItem key={expense._id} sx={{ bgcolor: "#FAFAFA", borderRadius: 2, mb: 2 }}>
                  <ListItemText
                    primary={`Total: ${expense.currency} ${expense.total.toFixed(2)}`}
                    secondary={`Members: ${expense.members.join(", ")}`}
                  />
                  <Tooltip title="Delete">
                    <IconButton onClick={() => deleteExpense(expense._id)} sx={{ ml: 2, color: "#E74C3C" }}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpenseSplitter;

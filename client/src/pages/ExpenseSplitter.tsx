import React, { useState } from "react";
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
  Card,
  CardContent,
} from "@mui/material";

interface ExpenseHistory {
  members: string[];
  expenses: number[];
  total: number;
  date: string;
}

const ExpenseSplitter = () => {
  const [members, setMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState("");
  const [expenses, setExpenses] = useState<number[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [history, setHistory] = useState<ExpenseHistory[]>([]);

  const addMember = () => {
    if (newMember.trim()) {
      setMembers([...members, newMember]);
      setExpenses([...expenses, 0]);
      setNewMember("");
    }
  };

  const updateExpense = (index: number, amount: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = amount;
    setExpenses(updatedExpenses);
    setTotalExpense(updatedExpenses.reduce((sum, val) => sum + val, 0));
  };

  const saveExpense = () => {
    if (members.length > 0) {
      const newHistoryItem: ExpenseHistory = {
        members,
        expenses,
        total: totalExpense,
        date: new Date().toLocaleString(),
      };
      setHistory([newHistoryItem, ...history]);
      setMembers([]);
      setExpenses([]);
      setTotalExpense(0);
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "#2D9CDB" }}
      >
        Expense Splitter
      </Typography>
      <Paper
        sx={{
          padding: 3,
          maxWidth: 600,
          margin: "0 auto",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
        }}
      >
        {/* Add Members Section */}
        <Typography variant="h6" sx={{ color: "#2D9CDB" }}>
          Add Members
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Member Name"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={addMember}
            sx={{
              borderRadius: 2,
              backgroundColor: "#2D9CDB",
              "&:hover": {
                backgroundColor: "#1565C0",
              },
            }}
          >
            Add
          </Button>
        </Box>
        <List sx={{ mt: 3 }}>
          {members.map((member, index) => (
            <ListItem key={index}>
              <ListItemText primary={member} />
              <TextField
                label="Expense"
                type="number"
                value={expenses[index]}
                onChange={(e) =>
                  updateExpense(index, parseFloat(e.target.value) || 0)
                }
                sx={{
                  width: 120,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Total and Save Section */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">
          Total Expense: ${totalExpense.toFixed(2)}
        </Typography>
        <Typography variant="h6">
          Each Member Owes: $
          {(totalExpense / members.length || 0).toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            borderRadius: 2,
            backgroundColor: "#27AE60",
            "&:hover": {
              backgroundColor: "#219653",
            },
          }}
          onClick={saveExpense}
        >
          Save Expense
        </Button>
      </Paper>

      {/* Expense History Section */}
      {history.length > 0 && (
        <Box
          sx={{
            mt: 5,
            padding: 3,
            maxWidth: 600,
            margin: "0 auto",
            backgroundColor: "#F9F9F9",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#E74C3C", textAlign: "center" }}
          >
            Expense History
          </Typography>
          <Grid container spacing={2}>
            {history.map((entry, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      transform: "scale(1.02)",
                      transition: "all 0.3s",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: "#2D9CDB", mb: 1 }}
                    >
                      Saved on: {entry.date}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Total Expense: ${entry.total.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      Members: {entry.members.join(", ")}
                    </Typography>
                    <Typography variant="body2">
                      Expenses: {entry.expenses.join(", ")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ExpenseSplitter;

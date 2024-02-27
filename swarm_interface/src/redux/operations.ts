// nodeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SwarmOperation = {
    operation_type: "spawn" | "terminate" | "node_failure" | "blocking";
    node_id: string;
}

type BlockingOperation = SwarmOperation & {
    operation_type: "blocking";
    node_id: string;
    blocking_type: string;
    args: Record<string, any>;
    context: Record<string, any>;
    next_function_to_call: string;
}

type SpawnOperation = SwarmOperation & {
    operation_type: "spawn";
    node_embryo: any; // Assuming NodeEmbryo is a type defined elsewhere
    termination_policy_change?: "simple" | "parallel_review" | "clone_with_questions_answered";
    node_id?: string;
}

type TerminationOperation = SwarmOperation & {
    operation_type: "terminate";
    node_id: string;
}

type FailureOperation = SwarmOperation & {
    operation_type: "node_failure";
    node_id?: string;
}

interface SwarmHistory {
  operations: SwarmOperation[];
}

const initialState: SwarmHistory = {
  operations: [],
};

const operationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOperations: (state, action: PayloadAction<{ operations: [SwarmOperation] }>) => {
        state.operations = action.payload.operations;
    },
    addOperation: (state, action: PayloadAction<SwarmOperation>) => {
      state.operations.push(action.payload);
    }
  },
});

export const { setOperations, addOperation } = operationSlice.actions;
export default operationSlice.reducer;
export type { SwarmHistory };


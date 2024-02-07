type User = {
    currentSwarm: string | null;
    username: string;
    userSwarms: string[];
    currentSection: string;
    currentGoal: string;
    isRunning: boolean;
};

export type { User };
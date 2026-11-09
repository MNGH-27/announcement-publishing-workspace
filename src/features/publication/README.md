# Publication

Owns publication attempts, operation state, status checks, and recovery after refresh.
Place components and state logic here as they are implemented. Export the feature's
public interface from index.ts when it has consumers.

Use the shared service client in ../../shared/api/announcementService.ts. Keep state
keyed by announcement and operation, independently of the selected announcement.

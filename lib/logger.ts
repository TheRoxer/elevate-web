type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isProduction = process.env.NODE_ENV === "production";
  private isDevelopment = process.env.NODE_ENV === "development";

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(`[DEBUG] ${message}`, context ?? "");
    }
  }

  /**
   * Send logs to external service
   * TODO: Integrate with Sentry
   */
  private sendToMonitoring(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): void {
    if (!this.isProduction) return;

    // TODO: Implement actual monitoring service integration
    // For now, this is a no-op in production to avoid console spam
  }

  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, context ?? "");
    }
    // In production, send to monitoring service (e.g., Sentry, LogRocket)
    this.sendToMonitoring("info", message, context);
  }

  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, context ?? "");
    }
    // In production, send to monitoring service
    this.sendToMonitoring("warn", message, context);
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorDetails = this.formatError(error);

    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, errorDetails, context ?? "");
    }

    // In production, always send errors to monitoring
    this.sendToMonitoring("error", message, {
      ...context,
      error: errorDetails,
    });
  }

  private formatError(error: Error | unknown): Record<string, unknown> {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: this.isDevelopment ? error.stack : undefined,
      };
    }
    return { error };
  }

  auth(event: string, userId?: string, context?: LogContext): void {
    this.info(`Auth: ${event}`, {
      userId,
      ...context,
    });
  }

  api(method: string, endpoint: string, context?: LogContext): void {
    this.debug(`API ${method} ${endpoint}`, context);
  }
}

export const logger = new Logger();

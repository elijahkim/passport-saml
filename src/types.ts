import * as passport from "passport";
import { Profile, SamlConfig } from ".";
import type { NextRequest } from "next/server";

export interface AuthenticateOptions extends passport.AuthenticateOptions {
  samlFallback?: "login-request" | "logout-request";
  additionalParams?: Record<string, any>;
}

export interface AuthorizeOptions extends AuthenticateOptions {
  samlFallback?: "login-request" | "logout-request";
}

export interface StrategyOptions {
  name?: string;
  passReqToCallback?: boolean;
}

export type User = Record<string, unknown>;

export interface RequestWithUser extends NextRequest {
  samlLogoutRequest: Profile;
  user: User;
}

export type VerifiedCallback = (
  err: Error | null,
  user?: Record<string, unknown>,
  info?: Record<string, unknown>
) => void;

export type VerifyWithRequest = (
  req: NextRequest,
  profile: Profile | null,
  done: VerifiedCallback
) => void;

export type VerifyWithoutRequest = (profile: Profile | null, done: VerifiedCallback) => void;

export type PassportSamlConfig = SamlConfig & StrategyOptions;

export type StrategyOptionsCallback = (err: Error | null, samlOptions?: PassportSamlConfig) => void;

interface BaseMultiStrategyConfig {
  getSamlOptions(req: NextRequest, callback: StrategyOptionsCallback): void;
}

export type MultiStrategyConfig = Partial<PassportSamlConfig> &
  StrategyOptions &
  BaseMultiStrategyConfig;

export class ErrorWithXmlStatus extends Error {
  constructor(message: string, public readonly xmlStatus: string) {
    super(message);
  }
}

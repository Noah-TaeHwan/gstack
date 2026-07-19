import { describe, expect, test } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";

/** setup-gbrain 정본 템플릿 본문. */
const setup = readFileSync(
  join(import.meta.dir, "..", "setup-gbrain", "SKILL.md.tmpl"),
  "utf-8",
);
/** sync-gbrain 정본 템플릿 본문. */
const sync = readFileSync(
  join(import.meta.dir, "..", "sync-gbrain", "SKILL.md.tmpl"),
  "utf-8",
);

describe("loopback GBrain OAuth and service-owned PGLite contracts", () => {
  test("setup uses OAuth/DCR without a static header for exact loopback URLs", () => {
    expect(setup).toContain("GBRAIN_LOOPBACK_OAUTH=1");
    expect(setup).toContain(".well-known/oauth-authorization-server");
    expect(setup).toContain("claude mcp login gbrain");
    expect(setup).toContain("put an `Authorization` header");
    expect(setup).toContain("http://127.0.0.1:*");
    expect(setup).toContain("fresh Claude Code process");
  });

  test("setup treats a remote-http PGLite lock as service ownership", () => {
    expect(setup).toContain('If `gbrain_mcp_mode == "remote-http"`');
    expect(setup).toContain("a long-running HTTP GBrain service may");
    expect(setup).toContain("Do not move the config, stop the service");
  });

  test("sync preserves a healthy service owner and reports skipped local stages", () => {
    expect(sync).toContain('`engine-locked`** AND `gbrain_mcp_mode == "remote-http"');
    expect(sync).toContain("Do not stop it merely to");
    expect(sync).toContain("code, memory, and dream stages will be skipped");
    expect(sync).toContain("separate `GBRAIN_HOME`");
  });
});

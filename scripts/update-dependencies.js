#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const packagesDir = path.join(__dirname, "../packages")
const workspacePackages = {}

// 모든 워크스페이스 패키지 정보 수집
function collectWorkspacePackages() {
  const packageDirs = fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const dir of packageDirs) {
    const packageJsonPath = path.join(packagesDir, dir, "package.json")
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
      workspacePackages[packageJson.name] = {
        version: packageJson.version,
        path: packageJsonPath,
        dependencies: packageJson.dependencies || {},
        devDependencies: packageJson.devDependencies || {},
      }
    }
  }
}

// 의존성 업데이트 확인 및 적용
function updateDependencies() {
  console.log("🔄 패키지 간 의존성 업데이트를 확인합니다...")

  let hasUpdates = false

  for (const [packageName, packageInfo] of Object.entries(workspacePackages)) {
    let packageJson = JSON.parse(fs.readFileSync(packageInfo.path, "utf8"))
    let updated = false

    // dependencies 확인
    if (packageJson.dependencies) {
      for (const [depName, depVersion] of Object.entries(
        packageJson.dependencies
      )) {
        if (workspacePackages[depName] && depVersion === "workspace:*") {
          const newVersion = `^${workspacePackages[depName].version}`
          console.log(
            `📦 ${packageName}: ${depName} 버전 업데이트 (workspace:* → ${newVersion})`
          )
          packageJson.dependencies[depName] = newVersion
          updated = true
        }
      }
    }

    // devDependencies 확인
    if (packageJson.devDependencies) {
      for (const [depName, depVersion] of Object.entries(
        packageJson.devDependencies
      )) {
        if (workspacePackages[depName] && depVersion === "workspace:*") {
          const newVersion = `^${workspacePackages[depName].version}`
          console.log(
            `📦 ${packageName}: ${depName} 개발 의존성 버전 업데이트 (workspace:* → ${newVersion})`
          )
          packageJson.devDependencies[depName] = newVersion
          updated = true
        }
      }
    }

    if (updated) {
      fs.writeFileSync(
        packageInfo.path,
        JSON.stringify(packageJson, null, 2) + "\n"
      )
      hasUpdates = true
    }
  }

  return hasUpdates
}

// workspace:* 형태로 되돌리기 (개발 모드용)
function revertToWorkspaceReferences() {
  console.log("🔄 workspace:* 참조로 되돌립니다...")

  for (const [packageName, packageInfo] of Object.entries(workspacePackages)) {
    let packageJson = JSON.parse(fs.readFileSync(packageInfo.path, "utf8"))
    let updated = false

    // dependencies 확인
    if (packageJson.dependencies) {
      for (const [depName, depVersion] of Object.entries(
        packageJson.dependencies
      )) {
        if (workspacePackages[depName] && depVersion.startsWith("^")) {
          console.log(
            `📦 ${packageName}: ${depName} workspace 참조로 되돌리기 (${depVersion} → workspace:*)`
          )
          packageJson.dependencies[depName] = "workspace:*"
          updated = true
        }
      }
    }

    // devDependencies 확인
    if (packageJson.devDependencies) {
      for (const [depName, depVersion] of Object.entries(
        packageJson.devDependencies
      )) {
        if (workspacePackages[depName] && depVersion.startsWith("^")) {
          console.log(
            `📦 ${packageName}: ${depName} 개발 의존성 workspace 참조로 되돌리기 (${depVersion} → workspace:*)`
          )
          packageJson.devDependencies[depName] = "workspace:*"
          updated = true
        }
      }
    }

    if (updated) {
      fs.writeFileSync(
        packageInfo.path,
        JSON.stringify(packageJson, null, 2) + "\n"
      )
    }
  }
}

// 메인 실행 함수
function main() {
  const command = process.argv[2]

  collectWorkspacePackages()

  console.log("📋 발견된 워크스페이스 패키지:")
  for (const [name, info] of Object.entries(workspacePackages)) {
    console.log(`  - ${name}@${info.version}`)
  }

  switch (command) {
    case "update":
      const hasUpdates = updateDependencies()
      if (hasUpdates) {
        console.log("✅ 의존성 업데이트가 완료되었습니다.")
      } else {
        console.log("✅ 업데이트할 의존성이 없습니다.")
      }
      break

    case "revert":
      revertToWorkspaceReferences()
      console.log("✅ workspace 참조로 되돌리기가 완료되었습니다.")
      break

    default:
      console.log("사용법:")
      console.log(
        "  node scripts/update-dependencies.js update  # 구체적 버전으로 업데이트"
      )
      console.log(
        "  node scripts/update-dependencies.js revert  # workspace:*로 되돌리기"
      )
      process.exit(1)
  }
}

main()

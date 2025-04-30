// app/api/projects/type/[name]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { formatString, replaceDashWithSpace } from "../../../../../utils/StringUtils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  
  if (!name) {
    return NextResponse.json({ error: "Type name is required" }, { status: 400 });
  }

  const formattedName = formatString(name);

  try {
    const projects = await prisma.project.findMany({
      where: {
        type: {
          name: formattedName
        },
      },
      orderBy: {
        sortOrder: "asc", 
      },
      include: {
        type: true,
        scopes: {
          include: {
            scope: true,
          },
        },
        sections: {
          include: {
            images: true,
          },
        },
      },
    });

    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "no-store, must-revalidate, max-age=0",
      },
    });
  } catch (error) {
    console.error(`Error fetching projects by type ${formattedName}:`, error);
    return NextResponse.json(
      { error: `Error fetching projects by type: ${error}` }, 
      { status: 500 }
    );
  }
}
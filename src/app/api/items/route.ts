export type Item = {
  id: number;
  name: string;
};

let items: Item[] = [{id:1,name:'Danny'},{id:2,name:'Danny2'}];
let idCounter = 2;

export async function GET() {
  return Response.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newItem: Item = { id: idCounter++, name: body.name };
  items.push(newItem);
  return Response.json(newItem, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const item = items.find(i => i.id === body.id);
  if (!item) return new Response("Not found", { status: 404 });
  item.name = body.name;
  return Response.json(item);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  items = items.filter(i => i.id !== id);
  return new Response(null, { status: 204 });
}
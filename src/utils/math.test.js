import { getDistance, clamp, resolveAnchor, rgbToHex } from "./math";

let data = [];
beforeEach(() => {
  data = [
    1,2,3
  ];
});

test("distance between points", () => {
  const p1 = { x: 0, y: 10 };
  const p2 = { x: 8, y: 16 };

  expect(getDistance(p1.x, p1.y, p2.x, p2.y)).toBe(10);
});

test("clamping", () => {
  const max = 50;
  const min = 30;
  expect(clamp(100, min, max)).toBe(50);
  expect(clamp(25, min, max)).toBe(30);
});

test("resolve anchors", () => {
  const anchor = {
    control1: { x: 200, y: 12 },
    control2: { x: 128, y: -9 },
    x: 173,
    y: 2
  };

  const resolved = resolveAnchor(anchor);

  expect(resolved.angle).toBeCloseTo(-2.8577985443814655);

  expect(resolved).toEqual({
    angle: -2.8577985443814655,
    lengthA: 46.32493928760188,
    lengthB: 28.792360097775937,
    x: 173,
    y: 2
  });

  // not mutating original
  const result = resolveAnchor(anchor).x;
  anchor.x = null;
  expect(result).not.toBeNull();
});

test("hex", () => {
  expect(rgbToHex(0xf00)).not.toBe('#F00');
});


test('async callback', done => {
  const result = (x) => {
    expect(x).toBe('ok');
    done();
  }

  setTimeout(() => result('ok'), 1);
})

test('promise callback resolved', () => {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok');
    }, 1);
  });

  // return p.then(data => {
  //   expect(data).toBe('ok');
  // });
  return expect(p).resolves.toBe('ok');
})
test('promise callback rejected', () => {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('no');
    }, 1);
  });
  return expect(p).rejects.toBe('no');
})

test('async callback resolved', async () => {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok');
    }, 1);
  });

  const result = await p;
  return expect(result).toBe('ok');
})

test('check data', () => {
  data.pop();
  expect(data).toContain(2);
});

test('check data fresh', () => {
  expect(data).toContain(3);
});
